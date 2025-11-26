import Navbar from '@/ui/layouts/Navbar';
import Footer from '@/ui/layouts/Footer';
import { 
  ArrowRight, 
  Target, 
  Users, 
  Briefcase, 
  Code2, 
  CheckCircle2, 
  XCircle,
  Zap,
  Puzzle,
  Globe
} from 'lucide-react';

const SolutionCard = ({ 
  icon: Icon, 
  title, 
  description, 
  metrics,
  color 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  metrics: string,
  color: string 
}) => (
  <div className="relative mt-8 group cursor-pointer">
    {/* Folder Tab */}
    <div className="absolute -top-8 left-0 w-32 h-9 bg-white border-t border-l border-r border-stone-200 rounded-t-lg z-0 group-hover:-translate-y-1 transition-transform duration-300">
       <div className={`absolute top-2 left-3 w-2 h-2 rounded-full ${color}`}></div>
    </div>
    
    {/* Main Card Content */}
    <div className="relative bg-white border border-stone-200 p-8 pt-10 shadow-sm z-10 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(28,25,23,0.1)] hover:border-stone-900 group-hover:-translate-y-1">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-md bg-stone-50 text-stone-900 border border-stone-100`}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <span className="font-mono text-xs text-stone-400 uppercase tracking-widest">{metrics}</span>
      </div>
      
      <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">{title}</h3>
      <p className="text-stone-600 font-light leading-relaxed mb-6">{description}</p>
      
      <div className="flex items-center gap-2 text-stone-900 font-medium text-sm group-hover:underline decoration-1 underline-offset-4">
        Explore use cases <ArrowRight size={16} />
      </div>
    </div>
  </div>
);

const ComparisonRow = ({ label, oldWay, newWay }: { label: string, oldWay: string, newWay: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-stone-200 last:border-0 items-center group hover:bg-stone-50 transition-colors px-4">
    <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest text-stone-500">{label}</div>
    <div className="md:col-span-4 flex items-start gap-3 text-stone-400 decoration-stone-300 decoration-1">
        <XCircle size={18} className="mt-1 flex-shrink-0 text-red-200" />
        <span className="line-through decoration-stone-300">{oldWay}</span>
    </div>
    <div className="md:col-span-1 flex justify-center md:rotate-0 rotate-90">
       <ArrowRight size={16} className="text-stone-300" />
    </div>
    <div className="md:col-span-4 flex items-start gap-3 text-stone-900 font-medium">
        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-green-600" />
        {newWay}
    </div>
  </div>
);

// --- Main Page Component ---

const SolutionsPage = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-orange-200 selection:text-orange-900 overflow-x-hidden text-stone-800">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] z-0 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-stone-500 font-mono text-xs uppercase tracking-widest mb-6 border border-stone-200 px-3 py-1 rounded-full bg-white">
                <Globe size={14} />
                One platform, endless possibilities
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif font-medium text-stone-900 leading-[1.1] mb-8 tracking-tight">
                Solved.<br/>
                <span className="italic text-stone-400">For every team.</span>
              </h1>
              <p className="text-xl text-stone-600 mb-10 max-w-lg leading-relaxed font-light">
                Whether you're hunting for leads, recruiting top talent, or gathering user feedback—PaperFill adapts to your workflow, not the other way around.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-stone-900 text-[#fdfbf7] px-8 py-4 rounded-none font-bold text-lg border border-stone-900 hover:bg-white hover:text-stone-900 transition-all shadow-[4px_4px_0px_0px_rgba(28,25,23,0.2)]">
                  Start Building
                </button>
              </div>
            </div>

            {/* Abstract Hero Visual */}
            <div className="relative h-[500px] bg-stone-100 border border-stone-200 p-8 overflow-hidden group">
               {/* Pattern */}
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #a8a29e 25%, #a8a29e 26%, transparent 27%, transparent 74%, #a8a29e 75%, #a8a29e 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #a8a29e 25%, #a8a29e 26%, transparent 27%, transparent 74%, #a8a29e 75%, #a8a29e 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>
               
               {/* Floating elements */}
               <div className="absolute top-12 right-12 w-64 bg-white p-6 shadow-xl border border-stone-200 rotate-3 transition-transform duration-700 group-hover:rotate-6 z-20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600"><Users size={16} /></div>
                    <div className="h-2 w-20 bg-stone-100 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-stone-50 rounded"></div>
                    <div className="h-2 w-3/4 bg-stone-50 rounded"></div>
                  </div>
               </div>

               <div className="absolute bottom-20 left-12 w-56 bg-stone-900 p-6 shadow-2xl border border-stone-800 -rotate-2 transition-transform duration-700 group-hover:-rotate-6 z-30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center text-white"><Zap size={16} /></div>
                    <div className="h-2 w-20 bg-stone-700 rounded"></div>
                  </div>
                  <div className="text-white font-mono text-2xl font-bold">85%</div>
                  <div className="text-stone-500 text-xs mt-1">Completion Rate</div>
               </div>

               {/* Connection Line */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                 <path d="M100 400 Q 250 250 400 100" fill="none" stroke="#d6d3d1" strokeWidth="2" strokeDasharray="6 6" />
               </svg>
            </div>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="py-24 px-6 bg-[#f5f3ef]">
          <div className="max-w-7xl mx-auto">
             <div className="mb-16">
               <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Pick your path.</h2>
               <div className="h-1 w-24 bg-orange-300"></div>
             </div>

             <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
               <SolutionCard 
                 icon={Target}
                 title="Marketing"
                 color="bg-purple-400"
                 description="Create interactive quizzes and lead capture forms that convert 3x better than static landing pages. Segment your audience automatically."
                 metrics="+45% Lead Gen"
               />
               <SolutionCard 
                 icon={Users}
                 title="Product"
                 color="bg-blue-400"
                 description="Gather deep insights with user research surveys that feel like a conversation. Prioritize your roadmap with real data."
                 metrics="10x Response Rate"
               />
               <SolutionCard 
                 icon={Briefcase}
                 title="HR & Recruiting"
                 color="bg-green-400"
                 description="Screen candidates effectively without making them hate the process. Automate scheduling and initial feedback."
                 metrics="-20hrs Admin Time"
               />
               <SolutionCard 
                 icon={Code2}
                 title="Enterprise"
                 color="bg-stone-800"
                 description="Secure, compliant data collection at scale. Single Sign-On (SSO), advanced permissions, and custom SLA support."
                 metrics="ISO 27001 Ready"
               />
             </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Why switch?</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Most forms are designed for databases, not people. We flipped the script.
              </p>
            </div>

            <div className="bg-white border border-stone-200 shadow-[8px_8px_0px_0px_rgba(231,229,228,1)] p-8 md:p-12">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 pb-4 border-b-2 border-stone-900">
                  <div className="md:col-span-3 font-bold font-serif text-lg">Metric</div>
                  <div className="md:col-span-4 font-bold font-serif text-lg text-stone-400">The Old Way</div>
                  <div className="md:col-span-1"></div>
                  <div className="md:col-span-4 font-bold font-serif text-lg text-stone-900">With PaperFill</div>
               </div>

               <ComparisonRow 
                 label="Experience"
                 oldWay="Long, scrollable wall of text"
                 newWay="One question at a time"
               />
               <ComparisonRow 
                 label="Mobile"
                 oldWay="Tiny checkboxes, pinch to zoom"
                 newWay="Big buttons, touch-native"
               />
               <ComparisonRow 
                 label="Logic"
                 oldWay="Shows irrelevant questions"
                 newWay="Adapts path based on answers"
               />
               <ComparisonRow 
                 label="Brand"
                 oldWay="Generic system UI"
                 newWay="Fully custom, white-labeled"
               />
               <ComparisonRow 
                 label="Data"
                 oldWay="CSV export only"
                 newWay="Real-time webhooks & integrations"
               />
            </div>
          </div>
        </section>

        {/* Integration / Workflow Visual */}
        <section className="py-24 px-6 bg-stone-900 text-[#fdfbf7] overflow-hidden">
           <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-stone-900 mb-8 animate-pulse">
                  <Puzzle size={24} />
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                  Plays nice with<br/>your stack.
                </h2>
                <p className="text-stone-400 text-lg font-light leading-relaxed mb-8">
                  Don't let data die in a spreadsheet. Automatically pipe responses into Slack, Notion, Salesforce, or your own database via webhooks.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm font-mono text-stone-500">
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Zapier Integration</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Native Webhooks</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Google Sheets</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Slack Alerts</div>
                </div>
              </div>

              <div className="relative">
                 {/* Visual Representation of Data Flow */}
                 <div className="relative z-10 bg-[#fdfbf7] text-stone-900 p-8 rounded-lg shadow-2xl">
                    <div className="flex items-center gap-3 border-b border-stone-200 pb-4 mb-4">
                       <div className="w-3 h-3 rounded-full bg-red-400"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                       <div className="w-3 h-3 rounded-full bg-green-400"></div>
                       <div className="ml-auto font-mono text-xs text-stone-400">webhook_config.json</div>
                    </div>
                    <div className="font-mono text-sm space-y-2">
                       <div className="text-purple-600">POST <span className="text-stone-600">/api/v1/responses</span></div>
                       <div className="text-stone-400">{`{`}</div>
                       <div className="pl-4 text-stone-800"><span className="text-blue-600">"event"</span>: <span className="text-green-600">"form_submit"</span>,</div>
                       <div className="pl-4 text-stone-800"><span className="text-blue-600">"data"</span>: {`{`}</div>
                       <div className="pl-8 text-stone-800"><span className="text-blue-600">"email"</span>: <span className="text-green-600">"alice@example.com"</span>,</div>
                       <div className="pl-8 text-stone-800"><span className="text-blue-600">"nps_score"</span>: <span className="text-orange-500">10</span></div>
                       <div className="pl-4 text-stone-400">{`}`}</div>
                       <div className="text-stone-400">{`}`}</div>
                    </div>
                    
                    {/* Success Tag */}
                    <div className="absolute -right-4 -bottom-4 bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold border border-green-200 flex items-center gap-2 shadow-lg">
                       <CheckCircle2 size={16} /> 200 OK
                    </div>
                 </div>

                 {/* Decorative background blur */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/20 blur-3xl -z-0"></div>
              </div>
           </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 px-6 text-center">
           <h2 className="text-5xl md:text-6xl font-serif font-medium text-stone-900 mb-8 tracking-tight">
             Ready to fix your forms?
           </h2>
           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-stone-900 text-[#fdfbf7] px-10 py-4 font-bold text-xl hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl">
                Get Started for Free
              </button>
              <button className="text-stone-600 hover:text-stone-900 font-serif italic text-lg px-6 py-4">
                Talk to Sales
              </button>
           </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default SolutionsPage;