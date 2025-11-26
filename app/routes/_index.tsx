import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Zap, 
  BarChart3, 
  ArrowRight, 
  Smile, 
  Check, 
  Palette, 
  Share2, 
  MousePointer2,
  Menu,
  X,
  Heart,
} from 'lucide-react';

interface Mood {
  icon: string;
  label: string;
  color: string;
}

const DemoForm: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [mood, setMood] = useState<Mood | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) setStep(1);
  };

  const moods: Mood[] = [
    { icon: '🤩', label: 'Amazing', color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300' },
    { icon: '😌', label: 'Chill', color: 'bg-blue-100 hover:bg-blue-200 border-blue-300' },
    { icon: '🫠', label: 'Melting', color: 'bg-orange-100 hover:bg-orange-200 border-orange-300' },
    { icon: '😤', label: 'Busy', color: 'bg-red-100 hover:bg-red-200 border-red-300' }
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Decorative floating elements */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-75"></div>

      <div className="relative bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 min-h-[400px] flex flex-col">
        {/* Header of the mini-app */}
        <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 w-full"></div>
        <div className="p-6 flex-1 flex flex-col justify-center">
          
          {step === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-4 shadow-sm">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Let's get started! <br/>What should we call you?</h3>
              <form onSubmit={handleNameSubmit} className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                    setIsTyping(e.target.value.length > 0);
                  }}
                  placeholder="Type your name..."
                  className="w-full text-lg px-0 py-4 border-b-2 border-slate-200 focus:border-purple-500 outline-none bg-transparent transition-colors placeholder:text-slate-300"
                  autoFocus
                />
                <button 
                  type="submit"
                  disabled={!name.trim()}
                  className={`absolute right-0 top-3 p-2 rounded-full transition-all duration-300 ${
                    name.trim() 
                      ? 'bg-purple-600 text-white translate-x-0 opacity-100 rotate-0' 
                      : 'bg-slate-200 text-slate-400 translate-x-4 opacity-0 -rotate-45'
                  }`}
                >
                  <ArrowRight size={20} />
                </button>
              </form>
              <p className="text-sm text-slate-400">Press Enter ↵</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="flex items-center gap-3 text-slate-500 mb-2">
                <button onClick={() => setStep(0)} className="hover:text-purple-600 transition-colors">
                  <ArrowRight size={16} className="rotate-180" />
                </button>
                <span className="text-sm font-medium uppercase tracking-wide">Question 2 of 2</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Hi <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{name}</span>! 👋 <br/>
                How's the vibe today?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {moods.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => {
                      setMood(m);
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all hover:scale-[1.02] active:scale-95 ${m.color} bg-opacity-30 border-opacity-20 hover:border-opacity-100 hover:shadow-md`}
                  >
                    <div className="text-2xl mb-1">{m.icon}</div>
                    <div className="font-semibold text-slate-700">{m.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center space-y-6 animate-in zoom-in duration-500 py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto animate-bounce shadow-green-200 shadow-lg">
                <Check size={40} strokeWidth={3} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-800 mb-2">You're all set!</h3>
                <p className="text-slate-500 text-lg">Thanks for remixing with us.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl inline-block border border-slate-100">
                <p className="text-sm text-slate-500">Captured Data Preview:</p>
                <div className="text-left mt-2 font-mono text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  {`{`}
                  <br/>&nbsp;&nbsp;"name": "{name}",
                  <br/>&nbsp;&nbsp;"vibe": "{mood?.label}"
                  <br/>{`}`}
                </div>
              </div>
              <div>
                <button 
                  onClick={() => {
                    setStep(0);
                    setName('');
                    setMood(null);
                  }}
                  className="text-purple-600 font-semibold hover:underline text-sm"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}

        </div>
        
        {/* Fake progress bar */}
        <div className="h-1 bg-slate-100 w-full mt-auto">
          <div 
            className="h-full bg-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${step === 0 ? 33 : step === 1 ? 66 : 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, desc, color }) => (
  <div className="group p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${color}`}>
      <Icon size={28} className="text-white" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="text-xl font-bold tracking-tight text-slate-900">PaperFill</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-purple-600 font-medium transition-colors">Features</a>
            <a href="#templates" className="text-slate-600 hover:text-purple-600 font-medium transition-colors">Templates</a>
            <a href="#pricing" className="text-slate-600 hover:text-purple-600 font-medium transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-slate-600 font-medium hover:text-purple-600 px-4 py-2">Log in</button>
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-slate-800 hover:shadow-lg transition-all active:scale-95">
              Get Started
            </button>
          </div>

          <button className="md:hidden text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden animate-in slide-in-from-top-10">
          <div className="flex flex-col gap-6 text-xl font-medium text-slate-800">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#templates" onClick={() => setMobileMenuOpen(false)}>Templates</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <hr className="border-slate-100" />
            <button className="bg-slate-900 text-white py-4 rounded-xl w-full">Sign Up Free</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 font-medium text-sm mb-8 border border-purple-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              v2.0 is live: Now with AI magic
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Forms that actually bring <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">joy.</span>
            </h1>
            
            <p className="text-xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Stop boring your users. Create conversational, interactive forms that feel like a chat and convert like magic. No coding required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
                Start Building <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                <Zap size={20} className="text-yellow-500 fill-yellow-500" /> See Templates
              </button>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*123}`} alt="User" />
                  </div>
                ))}
              </div>
              <p>Loved by 10,000+ creators</p>
            </div>
          </div>

          <div className="relative z-10 perspective-1000">
             {/* The Interactive Demo Component */}
             <DemoForm />
             
             {/* Background Blob behind form */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-purple-200/50 via-pink-200/50 to-orange-100/50 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Powering next-gen teams</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Logos */}
             {['Acme Corp', 'GlobalBank', 'Nebula', 'FoxRun', 'Circle'].map((logo) => (
               <span key={logo} className="text-2xl font-bold font-serif text-slate-800">{logo}</span>
             ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">More than just a form builder.</h2>
            <p className="text-xl text-slate-500">
              We took everything you hate about traditional data collection and threw it out the window. 
              Say hello to the future.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Palette} 
              color="bg-pink-500"
              title="Theme Engine" 
              desc="Don't look like everyone else. Customize every pixel, font, and animation to match your brand perfectly." 
            />
            <FeatureCard 
              icon={MousePointer2} 
              color="bg-purple-600"
              title="Logic Jumps" 
              desc="Create personalized paths. Show or hide questions based on previous answers instantly." 
            />
            <FeatureCard 
              icon={BarChart3} 
              color="bg-orange-500"
              title="Real-time Analytics" 
              desc="Watch responses roll in live. Visualize data with beautiful charts that are actually useful." 
            />
            <FeatureCard 
              icon={Share2} 
              color="bg-blue-500"
              title="Embed Anywhere" 
              desc="Notion, Webflow, React, or plain HTML. Drop your remix anywhere with a simple copy-paste." 
            />
            <FeatureCard 
              icon={Smile} 
              color="bg-green-500"
              title="Human Design" 
              desc="One question at a time. It feels like a conversation, reducing drop-off rates by up to 40%." 
            />
            <FeatureCard 
              icon={Zap} 
              color="bg-yellow-500"
              title="Instant Integrations" 
              desc="Send data to Slack, Sheets, Zapier, or your own webhook in milliseconds." 
            />
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-slate-900"></div>
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Ready to make data <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">delightful?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of creators making the internet a little less boring. 
            No credit card required.
          </p>
          
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-full inline-flex items-center max-w-md w-full border border-white/10 mb-8 hover:bg-white/15 transition-colors">
            <input 
              type="email" 
              placeholder="Enter your email..." 
              className="bg-transparent border-none outline-none text-white placeholder:text-slate-400 px-6 py-3 flex-1 w-full"
            />
            <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-purple-50 transition-colors flex items-center gap-2">
              Start Free <ArrowRight size={18} />
            </button>
          </div>
          
          <p className="text-sm text-slate-500">Free forever for personal use. Upgrade when you grow.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 pt-20 pb-10 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">P</div>
              <span className="text-xl font-bold text-slate-900">PaperFill</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Making the web interactive, one form at a time. Crafted with <Heart size={12} className="inline text-red-500 fill-red-500" /> in the cloud.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-purple-600">Templates</a></li>
              <li><a href="#" className="hover:text-purple-600">Integrations</a></li>
              <li><a href="#" className="hover:text-purple-600">Enterprise</a></li>
              <li><a href="#" className="hover:text-purple-600">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-purple-600">Community</a></li>
              <li><a href="#" className="hover:text-purple-600">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-600">API Docs</a></li>
              <li><a href="#" className="hover:text-purple-600">Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-purple-600">About</a></li>
              <li><a href="#" className="hover:text-purple-600">Careers</a></li>
              <li><a href="#" className="hover:text-purple-600">Blog</a></li>
              <li><a href="#" className="hover:text-purple-600">Legal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 text-sm text-slate-400">
          <p>© 2024 PaperFill Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-600">Privacy</a>
            <a href="#" className="hover:text-slate-600">Terms</a>
            <a href="#" className="hover:text-slate-600">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;