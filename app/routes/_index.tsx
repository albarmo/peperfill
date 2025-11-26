import { useState } from 'react';
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
  LayoutTemplate,
  Sliders,
  Puzzle,
  Globe,
  MessageSquare
} from 'lucide-react';
import Navbar from '@/ui/layouts/Navbar';
import Footer from '@/ui/layouts/Footer';

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
    { icon: '🤩', label: 'Amazing', color: 'bg-amber-100 hover:bg-amber-200 border-amber-300' },
    { icon: '😌', label: 'Chill', color: 'bg-stone-100 hover:bg-stone-200 border-stone-300' },
    { icon: '🫠', label: 'Melting', color: 'bg-orange-100 hover:bg-orange-200 border-orange-300' },
    { icon: '😤', label: 'Busy', color: 'bg-red-100 hover:bg-red-200 border-red-300' }
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Decorative floating elements - Subtle watercolor style */}
      <div className="absolute -top-8 -left-8 w-32 h-32 bg-orange-200/40 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-stone-300/40 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse delay-75"></div>

      {/* Main Card - Paper Style */}
      <div className="relative bg-[#fffdf9] border border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-xl overflow-hidden transition-all duration-500 min-h-[400px] flex flex-col">
        {/* Header of the mini-app - Ink Line */}
        <div className="h-1 bg-stone-900 w-full"></div>
        <div className="p-8 flex-1 flex flex-col justify-center">

          {step === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-12 h-12 bg-stone-100 rounded-lg border border-stone-200 flex items-center justify-center text-stone-700 mb-4">
                <Sparkles size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">Let's get started. <br />What is your name?</h3>
              <form onSubmit={handleNameSubmit} className="relative mt-8">
                <input
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                    setIsTyping(e.target.value.length > 0);
                  }}
                  placeholder="Type your name here..."
                  className="w-full font-serif text-2xl px-0 py-4 border-b-2 border-stone-200 focus:border-stone-900 outline-none bg-transparent transition-colors placeholder:text-stone-300 placeholder:italic text-stone-800"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className={`absolute right-0 top-4 p-2 rounded-full transition-all duration-300 ${name.trim()
                      ? 'bg-stone-900 text-white translate-x-0 opacity-100 rotate-0'
                      : 'bg-stone-100 text-stone-300 translate-x-4 opacity-0 -rotate-45'
                    }`}
                >
                  <ArrowRight size={20} />
                </button>
              </form>
              <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mt-4">Press Enter ↵</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="flex items-center gap-3 text-stone-400 mb-2">
                <button onClick={() => setStep(0)} className="hover:text-stone-800 transition-colors">
                  <ArrowRight size={16} className="rotate-180" />
                </button>
                <span className="text-xs font-mono uppercase tracking-widest">Question 2 of 2</span>
              </div>
              <h3 className="text-3xl font-serif font-bold text-stone-900 leading-tight">
                Hi <span className="underline decoration-wavy decoration-orange-300 decoration-2 underline-offset-4">{name}</span>. <br />
                How's the vibe?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {moods.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => {
                      setMood(m);
                      setStep(2);
                    }}
                    className={`p-4 rounded-lg border text-left transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${m.color} bg-opacity-40 border-stone-200 hover:border-stone-400 hover:shadow-sm`}
                  >
                    <div className="text-2xl mb-2 grayscale opacity-90">{m.icon}</div>
                    <div className="font-serif font-medium text-stone-800">{m.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center space-y-8 animate-in zoom-in duration-500 py-8">
              <div className="w-20 h-20 bg-stone-100 border border-stone-200 rounded-full flex items-center justify-center text-stone-800 mx-auto">
                <Check size={32} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-3xl font-serif font-bold text-stone-900 mb-3">All done.</h3>
                <p className="text-stone-500 text-lg font-serif italic">Thanks for filling this out.</p>
              </div>
              <div className="bg-stone-50 p-6 rounded-lg inline-block border border-dashed border-stone-300 relative">
                {/* Paper clip visual */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-8 border-2 border-stone-300 rounded-full bg-stone-50 z-10"></div>

                <p className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-3">Data Captured</p>
                <div className="text-left font-mono text-xs text-stone-600">
                  {`{`}
                  <br />&nbsp;&nbsp;"name": "{name}",
                  <br />&nbsp;&nbsp;"vibe": "{mood?.label}"
                  <br />{`}`}
                </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    setStep(0);
                    setName('');
                    setMood(null);
                  }}
                  className="text-stone-900 font-semibold border-b border-stone-900 hover:border-transparent transition-colors text-sm"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Progress bar - Pencil Style */}
        <div className="h-1.5 bg-stone-100 w-full mt-auto border-t border-stone-200">
          <div
            className="h-full bg-stone-800 transition-all duration-500 ease-out"
            style={{ width: `${step === 0 ? 33 : step === 1 ? 66 : 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

interface FeatureSectionProps {
  id?: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ElementType;
  align: 'left' | 'right';
  children?: React.ReactNode;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ id, title, subtitle, desc, icon: Icon, align, children }) => (
  <div id={id} className="py-24">
    <div className={`max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center ${align === 'right' ? 'md:grid-flow-col-dense' : ''}`}>
      <div className={align === 'right' ? 'md:col-start-2' : ''}>
        <div className="inline-flex items-center gap-2 text-stone-500 font-mono text-xs uppercase tracking-widest mb-6">
          <Icon size={16} />
          {subtitle}
        </div>
        <h2 className="text-4xl lg:text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight">{title}</h2>
        <p className="text-xl text-stone-600 leading-relaxed font-light mb-8">{desc}</p>
        <button className="text-stone-900 font-bold border-b-2 border-stone-900 hover:text-orange-600 hover:border-orange-600 transition-colors pb-1">
          Learn more &rarr;
        </button>
      </div>
      <div className={`relative ${align === 'right' ? 'md:col-start-1' : ''}`}>
        {/* Abstract Paper Representation of Feature */}
        <div className="relative bg-white border border-stone-200 shadow-[8px_8px_0px_0px_rgba(231,229,228,1)] p-8 min-h-[400px] flex items-center justify-center rotate-1 hover:rotate-0 transition-transform duration-500">
          {children ? children : (
            <div className="text-stone-300">Visual Placeholder</div>
          )}
          {/* Corner Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-orange-100/50 rotate-2 border-l border-r border-white/50"></div>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const indexNavLinks = [
    { name: "Solutions", href: "/#features" },
    { name: "Templates", href: "/#templates" },
    { name: "Resources", href: "/#resources" },
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-orange-200 selection:text-orange-900 overflow-x-hidden text-stone-800">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] z-0 mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-serif font-medium text-stone-900 leading-[1.1] mb-6 tracking-tight">
                Ask nicely. <br />
                <span className="italic relative inline-block">
                  <span className="relative z-10">Get more data.</span>
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-orange-200/60 -rotate-1 -z-0"></span>
                </span>
              </h1>

              <p className="text-xl text-stone-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Build forms, quizzes, and surveys that people actually enjoy answering. Turn a list of questions into a conversation and watch your completion rates soar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-stone-900 text-[#fdfbf7] px-8 py-4 rounded-none font-bold text-lg border border-stone-900 hover:bg-white hover:text-stone-900 transition-all flex items-center justify-center gap-2 group shadow-[4px_4px_0px_0px_rgba(28,25,23,0.2)]">
                  Start for free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-transparent text-stone-800 border border-stone-300 px-8 py-4 rounded-none font-bold text-lg hover:bg-stone-50 transition-all flex items-center justify-center gap-2 hover:border-stone-900">
                  <Zap size={20} strokeWidth={1.5} /> View Gallery
                </button>
              </div>
              <p className="mt-4 text-xs font-mono text-stone-400 uppercase tracking-widest">No credit card required • Unlimited time</p>
            </div>

            <div className="relative z-10 perspective-1000">
              <DemoForm />
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12 border-y border-stone-200 bg-[#faf8f4]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xs font-mono font-bold text-stone-400 uppercase tracking-widest mb-8">Trusted by the world's best teams</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60 grayscale mix-blend-multiply">
              {['Mailchimp', 'Hermès', 'Airbnb', 'Notion', 'Slack'].map((logo) => (
                <span key={logo} className="text-3xl font-serif font-bold text-stone-800 tracking-tighter italic">{logo}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Feature 1: The Experience */}
        <FeatureSection
          id="features"
          align="left"
          icon={LayoutTemplate}
          subtitle="The Experience"
          title="Ditch the wall of text."
          desc="Traditional forms are boring and overwhelming. PaperFill shows one question at a time, making the experience feel like a friendly chat. This simple change keeps people engaged and boosts completion rates."
        >
          <div className="space-y-4 w-full max-w-sm">
            <div className="p-4 bg-stone-50 border border-stone-200 rounded text-stone-400 text-sm">Question 1...</div>
            <div className="p-6 bg-white border border-stone-900 rounded shadow-md transform scale-105 z-10">
              <div className="font-serif font-bold text-lg text-stone-900 mb-2">What inspires you?</div>
              <div className="h-8 bg-stone-100 rounded w-full"></div>
            </div>
            <div className="p-4 bg-stone-50 border border-stone-200 rounded text-stone-400 text-sm">Question 3...</div>
          </div>
        </FeatureSection>

        {/* Feature 2: Logic */}
        <FeatureSection
          align="right"
          icon={Sliders}
          subtitle="Conditional Logic"
          title="Make it personal with Logic."
          desc="Don't ask questions that don't apply. Use Logic Jumps to show different questions based on previous answers. It's like a choose-your-own-adventure book, but for your data collection."
        >
          <div className="relative w-full max-w-sm h-64 flex items-center justify-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white border border-stone-800 p-3 rounded shadow-sm z-10">Option A</div>
            <div className="absolute bottom-10 left-10 bg-white border border-stone-200 p-3 rounded text-stone-400">Path 1</div>
            <div className="absolute bottom-10 right-10 bg-white border border-stone-200 p-3 rounded text-stone-400">Path 2</div>

            {/* Connector lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <path d="M192 40 L192 100 L80 100 L80 180" fill="none" stroke="#a8a29e" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M192 40 L192 100 L300 100 L300 180" fill="none" stroke="#a8a29e" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
        </FeatureSection>

        {/* Feature 3: Design */}
        <FeatureSection
          align="left"
          icon={Palette}
          subtitle="Brand Kit"
          title="Look good. Stay on brand."
          desc="You don't need to be a designer to create beautiful forms. Choose from our gallery of handcrafted paper textures, fonts, and layouts, or upload your own assets to match your brand identity perfectly."
        >
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <div className="aspect-square bg-[#f5f5dc] border border-stone-200 rounded-full flex items-center justify-center font-serif italic text-stone-600">Cream</div>
            <div className="aspect-square bg-stone-800 border border-stone-600 rounded-full flex items-center justify-center font-serif italic text-white">Ink</div>
            <div className="aspect-square bg-orange-100 border border-orange-200 rounded-full flex items-center justify-center font-serif italic text-orange-800">Clay</div>
            <div className="aspect-square bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-stone-200 border border-stone-300 rounded-full flex items-center justify-center font-serif italic text-stone-700">Grid</div>
          </div>
        </FeatureSection>

        {/* Templates Grid Section */}
        <section id="templates" className="py-24 px-6 bg-[#f5f3ef]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Get a head start.</h2>
              <p className="text-stone-600">Choose a template and make it yours in minutes.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Feedback Form', icon: MessageSquare },
                { title: 'Registration', icon: MousePointer2 },
                { title: 'Application', icon: LayoutTemplate },
                { title: 'Research Survey', icon: BarChart3 },
                { title: 'Lead Capture', icon: Zap },
                { title: 'Quiz', icon: Smile },
                { title: 'Order Form', icon: Share2 },
                { title: 'Event RSVP', icon: Globe }
              ].map((template) => (
                <div key={template.title} className="group bg-white p-6 border border-stone-200 hover:border-stone-900 transition-all cursor-pointer">
                  <template.icon className="text-stone-400 group-hover:text-orange-500 mb-4 transition-colors" size={24} />
                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:underline decoration-1 underline-offset-4">{template.title}</h3>
                  <p className="text-sm text-stone-500 mt-2">Start with this &rarr;</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section id="resources" className="py-24 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-stone-500 font-mono text-xs uppercase tracking-widest mb-6">
              <Puzzle size={16} />
              Connect
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-stone-900 mb-8">Play nice with your favorites.</h2>
            <p className="text-xl text-stone-600 font-light mb-12 max-w-2xl mx-auto">
              Connect PaperFill with 500+ of your favorite tools. Send data to Slack, create cards in Trello, or update rows in Google Sheets automatically.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {['Slack', 'Google Sheets', 'HubSpot', 'Notion', 'Zapier', 'Airtable', 'Mailchimp', 'Salesforce'].map(tool => (
                <div key={tool} className="px-6 py-3 bg-white border border-stone-200 rounded-full font-serif text-stone-600 shadow-sm">
                  {tool}
                </div>
              ))}
              <div className="px-6 py-3 bg-stone-100 border border-stone-200 rounded-full font-serif text-stone-400 border-dashed">
                + 500 more
              </div>
            </div>
          </div>
        </section>

        {/* Interactive CTA Section */}
        <section className="py-24 px-6 relative overflow-hidden border-t border-stone-200 bg-stone-900 text-[#fdfbf7]">
          {/* Background Texture for CTA */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")` }}>
          </div>

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-medium mb-8 tracking-tight">
              There's a better way <br />to ask.
            </h2>
            <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto font-light">
              You don't need to be technical. You don't need a designer. <br />You just need PaperFill.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#fdfbf7] text-stone-900 px-8 py-4 font-bold text-lg hover:bg-orange-100 transition-colors">
                Sign up for free
              </button>
            </div>

            <p className="text-sm text-stone-500 font-mono mt-8">No credit card required</p>
          </div>
        </section>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;