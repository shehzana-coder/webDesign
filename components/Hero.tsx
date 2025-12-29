
import React from 'react';
// Add Mic to imports
import { Play, ArrowRight, Shield, Accessibility, Globe, Mic } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-cyan-100/50 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-3/5 text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full text-blue-600 font-medium text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Next-Gen Voice-to-Voice AI
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">
              Transform Your Website Into a <span className="gradient-text">Conversational</span> Experience
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              SaaS Voice-to-Voice AI Assistant for Universities & Enterprises. Making digital platforms accessible, engaging, and human through real-time intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 flex items-center justify-center gap-2 group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Play className="w-4 h-4 text-blue-600 fill-current" />
                </div>
                Watch Demo
              </button>
            </div>

            <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Shield className="text-blue-600 w-5 h-5" />
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-3">
                <Accessibility className="text-blue-600 w-5 h-5" />
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">WCAG Compliant</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="text-blue-600 w-5 h-5" />
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Multi-lingual</span>
              </div>
            </div>
          </div>

          <div className="lg:w-2/5 relative animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            {/* Mockup Visualization */}
            <div className="relative glass rounded-3xl p-4 shadow-2xl border border-white/50">
              <img 
                src="https://picsum.photos/seed/dashboard/800/600" 
                alt="VocalizeWeb Dashboard" 
                className="rounded-2xl w-full"
              />
              {/* Floating Voice Wave UI */}
              <div className="absolute -bottom-10 -left-10 dark-glass p-6 rounded-2xl shadow-xl w-64 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Mic className="text-white w-4 h-4" />
                  </div>
                  <span className="text-white font-medium text-sm">System Listening...</span>
                </div>
                <div className="flex gap-1 h-8 items-end">
                   {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 bg-cyan-400 rounded-full wave-bar" style={{ animationDelay: `${i * 0.1}s`, height: `${30 + Math.random() * 70}%` }}></div>
                   ))}
                </div>
              </div>

              {/* Tooltip Overlay */}
              <div className="absolute top-10 -right-8 glass p-4 rounded-xl shadow-lg max-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Real-time STT</span>
                </div>
                <p className="text-xs text-gray-700 leading-tight">
                  "How do I apply for the computer science graduate program?"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-24 py-10 border-y border-gray-100 flex flex-wrap justify-center md:justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-3xl font-bold text-gray-900">763M</span>
            <span className="text-sm text-gray-500 font-medium">Adults Need Voice Accessibility</span>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-3xl font-bold text-gray-900">3x</span>
            <span className="text-sm text-gray-500 font-medium">Faster Than Keyboard Input</span>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-3xl font-bold text-gray-900">27%</span>
            <span className="text-sm text-gray-500 font-medium">Daily Voice Search Usage</span>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-3xl font-bold text-gray-900">10ms</span>
            <span className="text-sm text-gray-500 font-medium">Average Processing Latency</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;