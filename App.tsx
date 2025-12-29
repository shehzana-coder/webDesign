
import React, { useEffect, useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Github, 
  Twitter, 
  Linkedin, 
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import Hero from './components/Hero';
import VoiceAssistant from './components/VoiceAssistant';
import { 
  PRICING_TIERS, 
  FEATURES, 
  STATS, 
  SOLUTION_STEPS, 
  PROBLEM_CARDS, 
  TESTIMONIALS 
} from './constants';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <div className="flex gap-0.5 items-center">
                <div className="w-1 h-3 bg-white rounded-full"></div>
                <div className="w-1 h-5 bg-white rounded-full"></div>
                <div className="w-1 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">VocalizeWeb</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {['Features', 'Solutions', 'Pricing', 'Docs'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-widest">{item}</a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="text-sm font-bold text-gray-900 px-6 py-2 hover:bg-gray-50 rounded-lg transition-colors">Sign In</button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">Start Free Trial</button>
          </div>

          <button className="lg:hidden text-gray-900" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[100] p-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-black text-gray-900">VocalizeWeb</span>
            <button onClick={() => setMobileMenuOpen(false)}><X className="w-8 h-8" /></button>
          </div>
          <div className="flex flex-col gap-8 text-3xl font-bold">
            {['Features', 'Solutions', 'Pricing', 'Docs'].map(item => (
              <a key={item} href="#" onClick={() => setMobileMenuOpen(false)}>{item}</a>
            ))}
            <div className="pt-8 flex flex-col gap-4">
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl">Start Free Trial</button>
              <button className="w-full border-2 border-gray-100 py-4 rounded-xl">Sign In</button>
            </div>
          </div>
        </div>
      )}

      <Hero />

      {/* Problem Section */}
      <section id="solutions" className="py-32 bg-[#1F2937] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Traditional Web Interfaces Are Leaving Users Behind</h2>
            <p className="text-xl text-gray-400">Static layouts and text-heavy menus create unnecessary friction for over 1.3 billion people globally.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PROBLEM_CARDS.map((card, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-all group">
                <div className="mb-6 group-hover:scale-110 transition-transform">{card.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Pipeline */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">Complete Voice-to-Voice Intelligence</h2>
            <p className="text-gray-600">Our RAG-powered pipeline delivers human-like speed and context awareness, outperforming legacy voice search tools.</p>
          </div>
          
          <div className="flex flex-wrap lg:flex-nowrap justify-between items-start gap-8">
            {SOLUTION_STEPS.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center flex-1 min-w-[150px]">
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 shadow-sm text-blue-600 group hover:bg-blue-600 hover:text-white transition-all cursor-default">
                    {React.cloneElement(step.icon as React.ReactElement, { className: "w-8 h-8" })}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
                {idx < SOLUTION_STEPS.length - 1 && (
                  <div className="hidden lg:flex h-20 items-center text-blue-200">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section id="features" className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-6">Enterprise-Grade Voice AI Platform</h2>
              <p className="text-gray-600">Built for scale, security, and accessibility compliance. From smart navigation to deep analytics.</p>
            </div>
            <button className="text-blue-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Explore Documentation <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feat, idx) => (
              <div key={idx} className="glass p-10 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-700 to-cyan-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-5xl font-black">{stat.value}</div>
                <div className="text-blue-100 font-medium text-sm max-w-[150px] mx-auto leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience - Universities */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <img 
                src="https://picsum.photos/seed/edu/800/800" 
                alt="University students" 
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">Empower Your Campus with Voice</h2>
              <ul className="space-y-4">
                {[
                  "Help students find courses and deadlines instantly",
                  "Support students with visual or physical impairments",
                  "Automate common registrar queries by 40%",
                  "Multilingual support for international students"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full mt-1">
                      <Check className="text-green-600 w-4 h-4" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-6 bg-blue-50 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-blue-600 uppercase">Example Queries:</span>
                <p className="italic text-gray-600">"What are the prerequisites for the AI Fundamentals course?"</p>
                <p className="italic text-gray-600">"Where is the Financial Aid office located?"</p>
              </div>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">Learn About Edu Solutions</button>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-12">Built on Industry-Leading Technology</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 hover:opacity-100 transition-opacity">
            {['OpenAI', 'Microsoft Azure', 'Claude', 'FastAPI', 'React', 'Pinecone'].map(tech => (
              <span key={tech} className="text-2xl font-bold text-gray-900 grayscale hover:grayscale-0 transition-all">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Start free and scale as your institution grows. All plans include 256-bit encryption and SOC 2 security.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {PRICING_TIERS.map((tier, idx) => (
              <div key={idx} className={`p-10 rounded-[2.5rem] flex flex-col h-full transition-all ${tier.popular ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200 scale-105 relative z-10' : 'bg-gray-50 border border-gray-100 hover:border-blue-200 hover:shadow-xl'}`}>
                {tier.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-400 text-blue-900 px-4 py-1 rounded-full text-xs font-bold">MOST POPULAR</span>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-black">{tier.price}</span>
                    <span className={`${tier.popular ? 'text-blue-100' : 'text-gray-500'} font-medium`}>{tier.period}</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${tier.popular ? 'text-blue-50' : 'text-gray-500'}`}>{tier.description}</p>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div className={`p-1 rounded-full ${tier.popular ? 'bg-white/20' : 'bg-blue-100'}`}>
                        <Check className={`w-3 h-3 ${tier.popular ? 'text-white' : 'text-blue-600'}`} />
                      </div>
                      <span className="text-sm font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-4 rounded-2xl font-bold transition-all ${tier.popular ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200'}`}>
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How long does integration take?", a: "Most integrations take less than 15 minutes. It's a single JavaScript snippet that works with any CMS like WordPress, Webflow, or custom React apps." },
              { q: "Is the AI assistant accessible?", a: "Yes, we are fully WCAG 2.1 AA compliant. Our voice-first interface specifically addresses the needs of users with reading difficulties and visual impairments." },
              { q: "What security measures are in place?", a: "We use Azure's enterprise infrastructure. All data is encrypted in transit and at rest. We do not store sensitive user voice recordings." },
              { q: "Can I customize the voice?", a: "Professional and Enterprise plans allow you to choose from 10+ high-quality neural voices from ElevenLabs and Azure." }
            ].map((faq, idx) => (
              <details key={idx} className="glass rounded-2xl overflow-hidden group">
                <summary className="p-6 cursor-pointer list-none flex justify-between items-center font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100/50">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto bg-gradient-to-br from-blue-700 via-blue-800 to-cyan-700 rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
          {/* Decor */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">Ready to Make Your Website Conversational?</h2>
            <p className="text-xl text-blue-100">Join the voice revolution—start your 30-day free trial today. No credit card required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-800 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all shadow-xl">Start Free Trial</button>
              <button className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all">Schedule a Demo</button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-blue-200 uppercase tracking-widest">
              <span>No Credit Card</span>
              <span>Setup in Minutes</span>
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2937] text-gray-400 py-20 px-6">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                 <div className="flex gap-0.5 items-center">
                  <div className="w-1 h-3 bg-white rounded-full"></div>
                  <div className="w-1 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-black">VocalizeWeb</span>
            </div>
            <p className="text-sm leading-relaxed">
              Leading the way in Voice AI accessibility for the modern web. Built for trust, scale, and human inclusion.
            </p>
            <div className="flex gap-4">
              <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
              <Linkedin className="w-5 h-5 hover:text-white cursor-pointer" />
              <Github className="w-5 h-5 hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Docs</a></li>
              <li><a href="#" className="hover:text-white">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white">Case Studies</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">API Reference</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Security</a></li>
              <li><a href="#" className="hover:text-white">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
          <p>© 2024 VocalizeWeb AI. All rights reserved.</p>
          <p>Made with ❤️ for accessibility</p>
        </div>
      </footer>

      {/* Floating Demo Assistant */}
      <VoiceAssistant />
    </div>
  );
};

export default App;
