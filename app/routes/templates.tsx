import { useState } from 'react';
import { 
  Search, 
  Layout, 
  MessageSquare, 
  Users, 
  Calendar, 
  ShoppingBag, 
  Zap, 
  Star,
  Plus
} from 'lucide-react';
import Navbar from '@/ui/layouts/Navbar';
import Footer from '@/ui/layouts/Footer';



type Category = 'All' | 'Surveys' | 'Marketing' | 'Registration' | 'Feedback' | 'Events';

interface Template {
  id: number;
  title: string;
  category: Category;
  questions: number;
  time: string;
  popular?: boolean;
  color: string;
}

const templates: Template[] = [
  { id: 1, title: "Product Feedback", category: "Feedback", questions: 8, time: "2 min", popular: true, color: "bg-blue-100" },
  { id: 2, title: "Event Registration", category: "Registration", questions: 5, time: "1 min", color: "bg-orange-100" },
  { id: 3, title: "Customer Satisfaction (CSAT)", category: "Surveys", questions: 3, time: "30s", popular: true, color: "bg-green-100" },
  { id: 4, title: "Job Application", category: "Registration", questions: 12, time: "5 min", color: "bg-stone-200" },
  { id: 5, title: "Lead Generation", category: "Marketing", questions: 6, time: "2 min", popular: true, color: "bg-purple-100" },
  { id: 6, title: "Newsletter Signup", category: "Marketing", questions: 2, time: "15s", color: "bg-yellow-100" },
  { id: 7, title: "Event RSVP", category: "Events", questions: 4, time: "1 min", color: "bg-pink-100" },
  { id: 8, title: "Market Research", category: "Surveys", questions: 15, time: "8 min", color: "bg-cyan-100" },
  { id: 9, title: "Bug Report", category: "Feedback", questions: 7, time: "3 min", color: "bg-red-100" },
];

const TemplatePreview = ({ color }: { color: string }) => (
  <div className={`w-full aspect-[4/3] ${color} border-b border-stone-200 p-4 relative overflow-hidden group-hover:opacity-90 transition-opacity`}>
    {/* Abstract Paper Form UI */}
    <div className="bg-white w-full h-full shadow-sm border border-stone-100 p-3 flex flex-col gap-2 rounded-sm transform group-hover:translate-y-1 transition-transform duration-500">
      <div className="w-1/2 h-2 bg-stone-200 rounded-full mb-2"></div>
      <div className="w-full h-1 bg-stone-100 rounded-full"></div>
      <div className="w-3/4 h-1 bg-stone-100 rounded-full"></div>
      
      {/* Abstract Radio Buttons */}
      <div className="mt-2 space-y-1.5">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full border border-stone-300"></div>
            <div className="w-1/2 h-1 bg-stone-50 rounded-full"></div>
          </div>
        ))}
      </div>
      
      {/* Button */}
      <div className="mt-auto w-1/3 h-4 bg-stone-900 rounded-sm"></div>
    </div>

    {/* Use Template Overlay Button */}
    <div className="absolute inset-0 bg-stone-900/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <button className="bg-white text-stone-900 px-4 py-2 font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 border border-stone-200">
        Use Template
      </button>
    </div>
  </div>
);

const TemplateCard = ({ template }: { template: Template }) => (
  <div className="group bg-white border border-stone-200 hover:border-stone-900 transition-all duration-300 hover:shadow-[6px_6px_0px_0px_rgba(28,25,23,0.1)] cursor-pointer flex flex-col">
    <TemplatePreview color={template.color} />
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 border border-stone-100 px-2 py-0.5 rounded bg-stone-50">
          {template.category}
        </span>
        {template.popular && (
          <span className="text-orange-500 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide">
            <Star size={10} fill="currentColor" /> Popular
          </span>
        )}
      </div>
      <h3 className="font-serif font-bold text-lg text-stone-900 mb-1 group-hover:underline decoration-1 underline-offset-4">{template.title}</h3>
      <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-stone-400 font-mono">
        <span className="flex items-center gap-1"><Layout size={12} /> {template.questions} Qs</span>
        <span className="flex items-center gap-1"><Zap size={12} /> {template.time}</span>
      </div>
    </div>
  </div>
);

const CreateBlankCard = () => (
  <div className="group bg-white border-2 border-dashed border-stone-300 hover:border-stone-900 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-8 h-full min-h-[300px] hover:bg-stone-50">
    <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:text-white transition-colors mb-4">
      <Plus size={32} />
    </div>
    <h3 className="font-serif font-bold text-xl text-stone-900">Start from scratch</h3>
    <p className="text-stone-500 text-sm mt-2 text-center max-w-[200px]">
      Design a custom form with our drag-and-drop builder.
    </p>
  </div>
);

const FilterButton = ({ active, label, onClick, icon: Icon }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all whitespace-nowrap border
      ${active 
        ? 'bg-stone-900 text-white border-stone-900' 
        : 'bg-white text-stone-500 border-stone-200 hover:border-stone-900 hover:text-stone-900'}
    `}
  >
    {Icon && <Icon size={14} />}
    {label}
  </button>
);

// --- Main Page Component ---

const TemplatesPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-orange-200 selection:text-orange-900 overflow-x-hidden text-stone-800">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] z-0 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-40 pb-16 px-6 bg-stone-50 border-b border-stone-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-serif font-medium text-stone-900 mb-6 tracking-tight">
                  Don't start <br/>
                  <span className="italic text-stone-400">from scratch.</span>
                </h1>
                <p className="text-xl text-stone-600 mb-8 max-w-md leading-relaxed font-light">
                  Steal our best ideas. Browse 100+ templates designed by experts to get you better data, faster.
                </p>
                
                {/* Search Bar */}
                <div className="relative max-w-lg">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                  <input 
                    type="text"
                    placeholder="Search for templates (e.g. 'Feedback')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-stone-300 focus:border-stone-900 outline-none transition-colors shadow-sm font-serif"
                  />
                </div>
              </div>

              {/* Decorative Hero Visual */}
              <div className="hidden md:block relative h-[300px]">
                {/* Stack of cards effect */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-80 bg-white border border-stone-200 rotate-6 shadow-lg z-10 p-4">
                  <div className="w-full h-full bg-stone-50 border border-stone-100 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"><Star size={24}/></div>
                    <div className="h-2 w-20 bg-stone-200 rounded"></div>
                  </div>
                </div>
                <div className="absolute right-12 top-1/2 -translate-y-1/2 w-64 h-80 bg-white border border-stone-200 -rotate-3 shadow-md z-20 p-4">
                  <div className="w-full h-full bg-stone-50 border border-stone-100 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><MessageSquare size={24}/></div>
                    <div className="h-2 w-20 bg-stone-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Sticky Bar */}
        <section className="sticky top-20 z-40 bg-[#fdfbf7]/95 backdrop-blur-sm border-b border-stone-200 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
             <div className="flex gap-3 min-w-max">
                <FilterButton active={activeCategory === 'All'} label="All Templates" onClick={() => setActiveCategory('All')} icon={Layout} />
                <FilterButton active={activeCategory === 'Surveys'} label="Surveys" onClick={() => setActiveCategory('Surveys')} icon={MessageSquare} />
                <FilterButton active={activeCategory === 'Marketing'} label="Marketing" onClick={() => setActiveCategory('Marketing')} icon={ShoppingBag} />
                <FilterButton active={activeCategory === 'Registration'} label="Registration" onClick={() => setActiveCategory('Registration')} icon={Users} />
                <FilterButton active={activeCategory === 'Feedback'} label="Feedback" onClick={() => setActiveCategory('Feedback')} icon={Star} />
                <FilterButton active={activeCategory === 'Events'} label="Events" onClick={() => setActiveCategory('Events')} icon={Calendar} />
             </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              
              {/* Always show "Create Blank" as the first card if searching is empty or on 'All' */}
              {(!searchQuery && activeCategory === 'All') && (
                <div className="sm:col-span-1">
                   <CreateBlankCard />
                </div>
              )}

              {filteredTemplates.map(template => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-20">
                <h3 className="font-serif text-xl text-stone-900 mb-2">No templates found</h3>
                <p className="text-stone-500 mb-6">We couldn't find any templates matching "{searchQuery}".</p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveCategory('All')}}
                  className="text-stone-900 font-bold underline decoration-1"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Categories Section (SEO / Navigation) */}
        <section className="py-20 bg-stone-900 text-[#fdfbf7] px-6">
          <div className="max-w-7xl mx-auto">
             <h2 className="text-3xl font-serif font-bold mb-12">Browse by Category</h2>
             <div className="grid md:grid-cols-3 gap-12">
                <div>
                   <h3 className="font-bold text-lg mb-4 text-orange-200 border-b border-stone-700 pb-2">Business</h3>
                   <ul className="space-y-3 text-stone-400">
                      <li className="hover:text-white cursor-pointer transition-colors">Order Forms</li>
                      <li className="hover:text-white cursor-pointer transition-colors">Payment Forms</li>
                      <li className="hover:text-white cursor-pointer transition-colors">Registration Forms</li>
                      <li className="hover:text-white cursor-pointer transition-colors">Application Forms</li>
                   </ul>
                </div>
                <div>
                   <h3 className="font-bold text-lg mb-4 text-blue-200 border-b border-stone-700 pb-2">Feedback</h3>
                   <ul className="space-y-3 text-stone-400">
                      <li className="hover:text-white cursor-pointer transition-colors">Satisfaction Surveys</li>
                      <li className="hover:text-white cursor-pointer transition-colors">Employee Feedback</li>
                      <li className="hover:text-white cursor-pointer transition-colors">Net Promoter Score (NPS)</li>
                      <li className="hover:text-white cursor-pointer transition-colors">Market Research</li>
                   </ul>
                </div>
                <div>
                   <h3 className="font-bold text-lg mb-4 text-green-200 border-b border-stone-700 pb-2">Education</h3>
                   <ul className="space-y-3 text-stone-400">
                      <li className="hover:text-white cursor-pointer transition-colors">Quizzes</li>
                      <li className="hover:text-white cursor-pointer transition-colors">Class Registration</li>
                      <li className="hover:text-white cursor-pointer transition-colors">Course Evaluation</li>
                      <li className="hover:text-white cursor-pointer transition-colors">Student Surveys</li>
                   </ul>
                </div>
             </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default TemplatesPage;