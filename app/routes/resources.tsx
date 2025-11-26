import { useState } from 'react';
import { 
    Search, 
    ArrowRight, 
    BookOpen, 
    FileText, 
    Video, 
    Code, 
    ChevronRight,
    Calendar,
    Tag,
    Sparkles
} from 'lucide-react';
import Navbar from '@/ui/layouts/Navbar';
import Footer from '@/ui/layouts/Footer';

type Category = 'All' | 'Guides' | 'Engineering' | 'Case Studies' | 'Design';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: Category;
  readTime: string;
  date: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: 1,
    title: "The Art of Asking: How to double your completion rates",
    excerpt: "We analyzed 10,000 forms to understand why people drop off. The answer lies in how you phrase the very first question.",
    category: "Guides",
    readTime: "5 min read",
    date: "Oct 12, 2024",
    featured: true
  },
  {
    id: 2,
    title: "Conditional Logic 101",
    excerpt: "Stop asking irrelevant questions. Learn how to build branching paths that make your users feel heard.",
    category: "Guides",
    readTime: "8 min read",
    date: "Oct 08, 2024"
  },
  {
    id: 3,
    title: "How Notion uses PaperFill for user feedback",
    excerpt: "A deep dive into how the productivity giant collects structured data without breaking their design system.",
    category: "Case Studies",
    readTime: "6 min read",
    date: "Sep 28, 2024"
  },
  {
    id: 4,
    title: "Webhooks & API Integrations",
    excerpt: "Technical documentation on how to pipe your form data directly into your PostgreSQL database.",
    category: "Engineering",
    readTime: "12 min read",
    date: "Sep 20, 2024"
  },
  {
    id: 5,
    title: "Typography in Data Collection",
    excerpt: "Why font choice impacts the honesty of answers. A psychological study on serif vs sans-serif.",
    category: "Design",
    readTime: "4 min read",
    date: "Sep 15, 2024"
  },
  {
    id: 6,
    title: "The 2025 State of Forms Report",
    excerpt: "Trends, benchmarks, and data from millions of interactions across the web.",
    category: "Case Studies",
    readTime: "15 min read",
    date: "Sep 10, 2024"
  }
];

const ArticleCard = ({ article }: { article: Article }) => (
  <div className="group flex flex-col h-full bg-white border border-stone-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-stone-900 hover:shadow-[6px_6px_0px_0px_rgba(28,25,23,0.1)] cursor-pointer">
    <div className="flex items-center justify-between mb-6">
      <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-mono uppercase tracking-widest border border-stone-200">
        {article.category}
      </span>
      <span className="text-stone-400 text-xs font-mono">{article.readTime}</span>
    </div>
    
    <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4 leading-tight group-hover:underline decoration-orange-300 decoration-2 underline-offset-4">
      {article.title}
    </h3>
    
    <p className="text-stone-600 mb-6 flex-grow font-light leading-relaxed">
      {article.excerpt}
    </p>

    <div className="flex items-center justify-between mt-auto pt-6 border-t border-stone-100">
      <span className="text-xs font-mono text-stone-400">{article.date}</span>
      <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-900 group-hover:bg-stone-900 group-hover:text-white transition-colors">
        <ArrowRight size={16} />
      </div>
    </div>
  </div>
);

const FeaturedCard = ({ article }: { article: Article }) => (
  <div className="relative group bg-[#fffdf9] border border-stone-200 overflow-hidden md:col-span-2 lg:col-span-3 min-h-[400px] flex flex-col md:flex-row hover:border-stone-400 transition-colors">
    {/* Decorative corner tape */}
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-orange-100/80 rotate-1 border-l border-r border-white/50 z-10 shadow-sm"></div>
    
    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative z-10">
      <div className="inline-flex items-center gap-2 text-orange-600 font-mono text-xs uppercase tracking-widest mb-6">
        <Sparkles size={14} />
        Editor's Pick
      </div>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6 leading-[1.1]">
        {article.title}
      </h2>
      <p className="text-xl text-stone-600 mb-8 max-w-xl leading-relaxed font-light">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-4">
        <button className="bg-stone-900 text-[#fdfbf7] px-8 py-3 rounded-none font-bold hover:bg-white hover:text-stone-900 border border-stone-900 transition-all shadow-[4px_4px_0px_0px_rgba(28,25,23,0.1)] active:translate-y-0.5 active:shadow-none">
          Read Article
        </button>
        <span className="font-mono text-xs text-stone-400">{article.readTime}</span>
      </div>
    </div>
    
    {/* Abstract Illustration Side */}
    <div className="w-full md:w-1/3 bg-stone-100 relative border-l border-stone-200 overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#44403c 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-64 bg-white border border-stone-300 shadow-xl rotate-3 flex flex-col p-4 animate-in slide-in-from-bottom-8 duration-700">
                <div className="w-full h-2 bg-stone-100 mb-4"></div>
                <div className="w-2/3 h-2 bg-stone-100 mb-8"></div>
                <div className="flex-1 border-l-2 border-orange-200 pl-4 flex items-center text-stone-300 italic font-serif text-2xl">
                    "A"
                </div>
            </div>
        </div>
    </div>
  </div>
);



// --- Main Page Component ---

const ResourcePage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Category[] = ['All', 'Guides', 'Engineering', 'Case Studies', 'Design'];

  // Filter articles logic
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-orange-200 selection:text-orange-900 overflow-x-hidden text-stone-800">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] z-0 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10">
        <Navbar activeLink="Resources" />

        {/* Hero Section */}
        <section className="pt-40 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-stone-900 mb-8 tracking-tight">
              The Library
            </h1>
            <p className="text-xl text-stone-600 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              Thoughts on data collection, design patterns, and making the web feel a little more human.
            </p>

            {/* Search Input */}
            <div className="relative max-w-xl mx-auto group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-stone-900 transition-colors">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search for topics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-b-2 border-stone-200 focus:border-stone-900 outline-none text-lg font-serif placeholder:text-stone-300 placeholder:italic transition-all shadow-[0_4px_20px_rgb(0,0,0,0.02)]"
              />
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="sticky top-20 z-40 bg-[#fdfbf7]/95 backdrop-blur-sm py-4 border-b border-stone-100 mb-12">
          <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-max pb-2 md:pb-0 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 border
                    ${activeCategory === cat 
                      ? 'bg-stone-900 text-white border-stone-900 shadow-[2px_2px_0px_0px_rgba(231,229,228,1)]' 
                      : 'bg-transparent text-stone-500 border-transparent hover:border-stone-200 hover:bg-stone-50'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <main className="max-w-7xl mx-auto px-6 pb-24">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Article (Only show if on 'All' tab and no search) */}
            {activeCategory === 'All' && !searchQuery && featuredArticle && (
              <FeaturedCard article={featuredArticle} />
            )}

            {/* Regular Articles */}
            {regularArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {regularArticles.length === 0 && (
            <div className="text-center py-20 border border-dashed border-stone-300 rounded bg-stone-50">
              <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                <FileText size={24} />
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-2">No results found</h3>
              <p className="text-stone-500">Try adjusting your search terms.</p>
              <button 
                onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
                className="mt-6 text-stone-900 underline decoration-1 underline-offset-4 hover:text-orange-600"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>

        {/* Newsletter / CTA */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <div className="relative bg-stone-900 text-[#fdfbf7] p-8 md:p-16 overflow-hidden shadow-2xl">
             {/* Background texture for CTA */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-10">
              <div className="flex-1">
                <h2 className="text-3xl font-serif font-bold mb-4">Stay in the loop.</h2>
                <p className="text-stone-400 font-light leading-relaxed mb-6">
                  Get the latest templates, design tips, and case studies sent to your inbox. No spam, just good content.
                </p>
                
                <form className="flex w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 bg-white/10 border border-stone-700 text-white placeholder:text-stone-500 px-4 py-3 outline-none focus:bg-white/20 transition-colors font-mono text-sm"
                  />
                  <button className="bg-[#fdfbf7] text-stone-900 px-6 py-3 font-bold hover:bg-orange-100 transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Visual element: Envelope */}
              <div className="hidden md:block w-48 h-32 bg-white/5 border border-white/20 relative rotate-6">
                 <div className="absolute top-0 left-0 w-full h-full border-b border-l border-white/10 origin-top-right transform -skew-y-12"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full mix-blend-multiply opacity-80 blur-xl"></div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default ResourcePage;