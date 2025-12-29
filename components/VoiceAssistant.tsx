
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, X, MessageCircle, Volume2, Loader2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';

// Base64 helper methods as per guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [lastUserSpeech, setLastUserSpeech] = useState<string>("");

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const cleanup = useCallback(() => {
    if (sessionRef.current) {
      // sessionRef.current.close() is handled by the promise chain if needed
      sessionRef.current = null;
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
  }, []);

  const startSession = async () => {
    setIsConnecting(true);
    try {
      // Correct initialization using process.env.API_KEY as per instructions
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputAudioContext;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob: Blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
              setLastUserSpeech(prev => prev + message.serverContent?.inputTranscription?.text);
            }
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + message.serverContent?.outputTranscription?.text);
            }
            if (message.serverContent?.turnComplete) {
              // Reset buffers for next turn potentially, but let's keep history for now
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
              const sourceNode = outputAudioContext.createBufferSource();
              sourceNode.buffer = audioBuffer;
              sourceNode.connect(outputAudioContext.destination);
              sourceNode.addEventListener('ended', () => {
                sourcesRef.current.delete(sourceNode);
              });
              sourceNode.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(sourceNode);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => console.error("Gemini Error:", e),
          onclose: () => cleanup(),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: "You are the VocalizeWeb AI Assistant. Your goal is to help potential enterprise and university clients understand the value of voice interaction. Be professional, friendly, and persuasive. Explain that VocalizeWeb uses Gemini 2.5 Flash for ultra-low latency. Keep answers concise as they are spoken aloud.",
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Failed to start session", err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    cleanup();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 glass rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-blue-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <Mic className="text-white w-5 h-5" />
              </div>
              <span className="text-white font-semibold">Vocalize Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 min-h-[300px] max-h-[400px] overflow-y-auto flex flex-col gap-4">
            {!isActive && !isConnecting ? (
              <div className="text-center space-y-4 py-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Mic className="text-blue-600 w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Experience VocalizeWeb</h3>
                  <p className="text-sm text-gray-600 px-4">Click below to start a voice-to-voice conversation with our AI.</p>
                </div>
                <button 
                  onClick={startSession}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
                >
                  Start Speaking
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Live Audio {isConnecting && "(Connecting...)"}
                  </div>
                  <div className="flex justify-center py-4">
                    <div className="flex gap-1 items-end h-12">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1 bg-blue-600 rounded-full wave-bar"
                          style={{ animationDelay: `${i * 0.1}s`, height: `${20 + Math.random() * 80}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {lastUserSpeech && (
                  <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700">
                    <span className="font-bold text-blue-600">You: </span>
                    {lastUserSpeech}
                  </div>
                )}

                {transcription && (
                  <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
                    <span className="font-bold text-blue-600">Assistant: </span>
                    {transcription}
                  </div>
                )}

                <button 
                  onClick={stopSession}
                  className="w-full border-2 border-red-500 text-red-500 py-2 rounded-full font-bold hover:bg-red-50 transition-colors"
                >
                  End Conversation
                </button>
              </div>
            )}
          </div>
          
          <div className="px-6 py-3 bg-gray-50 text-[10px] text-gray-400 flex items-center gap-2">
            <Volume2 className="w-3 h-3" />
            Powered by Gemini 2.5 Flash Native Audio
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group ${isOpen ? 'bg-gray-900 rotate-90' : 'bg-blue-600 hover:scale-110'}`}
      >
        {isOpen ? (
          <X className="text-white w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="text-white w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default VoiceAssistant;