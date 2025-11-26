import { useState } from 'react';
import { 
  X, 
  Search, 
  Palette, 
  Type, 
  Layout, 
  Droplet, 
  Smartphone,
  Monitor,
  Maximize2,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/ui/layouts/Navbar';

const Footer = () => (
  <footer className="bg-[#fdfbf7] pt-20 pb-10 px-6 border-t border-stone-200 mt-20">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-stone-400 font-mono">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <div className="w-6 h-6 bg-stone-900 flex items-center justify-center text-white font-serif font-bold text-xs">P</div>
        <span className="font-bold text-stone-900">PaperFill</span>
      </div>
      <p>© 2024 PaperFill Inc.</p>
    </div>
  </footer>
);

// --- Theme Data & Components ---

interface Theme {
  id: string;
  name: string;
  category: 'Minimal' | 'Vibrant' | 'Corporate' | 'Dark';
  font: string; // Tailwind class description
  bgStyle: string;
  buttonStyle: string;
  inputStyle: string;
  textColor: string;
  accentColor: string;
}

const themes: Theme[] = [
  {
    id: 'classic-paper',
    name: 'Classic Paper',
    category: 'Minimal',
    font: 'font-serif',
    bgStyle: 'bg-[#fdfbf7]',
    buttonStyle: 'bg-stone-900 text-white rounded-none',
    inputStyle: 'border-b-2 border-stone-200 bg-transparent rounded-none',
    textColor: 'text-stone-900',
    accentColor: '#d6d3d1'
  },
  {
    id: 'midnight-ink',
    name: 'Midnight Ink',
    category: 'Dark',
    font: 'font-sans',
    bgStyle: 'bg-stone-900',
    buttonStyle: 'bg-white text-stone-900 rounded-lg',
    inputStyle: 'border border-stone-700 bg-stone-800 rounded-lg',
    textColor: 'text-white',
    accentColor: '#44403c'
  },
  {
    id: 'swiss-grid',
    name: 'Swiss Grid',
    category: 'Corporate',
    font: 'font-sans font-bold',
    bgStyle: 'bg-white',
    buttonStyle: 'bg-blue-600 text-white rounded-none uppercase tracking-widest',
    inputStyle: 'border-2 border-black bg-stone-50 rounded-none',
    textColor: 'text-black',
    accentColor: '#2563eb'
  },
  {
    id: 'soft-clay',
    name: 'Soft Clay',
    category: 'Minimal',
    font: 'font-sans',
    bgStyle: 'bg-orange-50',
    buttonStyle: 'bg-orange-300 text-orange-900 rounded-2xl shadow-sm',
    inputStyle: 'border-none bg-white rounded-2xl shadow-sm',
    textColor: 'text-stone-700',
    accentColor: '#fdba74'
  },
  {
    id: 'neon-tokyo',
    name: 'Neon Tokyo',
    category: 'Vibrant',
    font: 'font-mono',
    bgStyle: 'bg-black',
    buttonStyle: 'bg-pink-500 text-white border-2 border-cyan-400 shadow-[4px_4px_0px_0px_#22d3ee] rounded-none',
    inputStyle: 'border-2 border-pink-500 bg-black text-white rounded-none',
    textColor: 'text-cyan-400',
    accentColor: '#ec4899'
  },
  {
    id: 'botanical',
    name: 'Botanical',
    category: 'Minimal',
    font: 'font-serif',
    bgStyle: 'bg-green-50',
    buttonStyle: 'bg-green-800 text-green-50 rounded-full',
    inputStyle: 'border-b border-green-800 bg-transparent rounded-none',
    textColor: 'text-green-900',
    accentColor: '#166534'
  },
  {
    id: 'startup-blue',
    name: 'Tech Blue',
    category: 'Corporate',
    font: 'font-sans',
    bgStyle: 'bg-slate-50',
    buttonStyle: 'bg-blue-500 text-white rounded shadow-lg shadow-blue-200',
    inputStyle: 'border border-slate-200 bg-white rounded',
    textColor: 'text-slate-800',
    accentColor: '#3b82f6'
  },
  {
    id: 'sunset-gradient',
    name: 'Sunset',
    category: 'Vibrant',
    font: 'font-sans',
    bgStyle: 'bg-gradient-to-br from-orange-100 to-pink-100',
    buttonStyle: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl',
    inputStyle: 'bg-white/50 backdrop-blur border border-white/40 rounded-xl',
    textColor: 'text-stone-800',
    accentColor: '#f97316'
  },
  {
    id: 'monotype',
    name: 'Terminal',
    category: 'Dark',
    font: 'font-mono',
    bgStyle: 'bg-zinc-900',
    buttonStyle: 'bg-green-500 text-black border border-green-400 hover:bg-green-400',
    inputStyle: 'bg-black border border-green-500 text-green-500',
    textColor: 'text-green-500',
    accentColor: '#22c55e'
  }
];

// --- Preview Modal Component ---

const PreviewModal = ({ theme, onClose }: { theme: Theme | null; onClose: () => void }) => {
  if (!theme) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-stone-200">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-stone-200 bg-white z-10">
          <div className="flex items-center gap-4">
            <h3 className="font-serif font-bold text-xl text-stone-900">{theme.name}</h3>
            <span className="px-2 py-1 bg-stone-100 rounded text-xs font-mono uppercase text-stone-500 tracking-wider">{theme.category}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 mr-4 text-stone-400 text-sm font-medium">
               <span className="flex items-center gap-2"><Monitor size={16} /> Desktop</span>
               <div className="w-px h-4 bg-stone-200"></div>
               <span className="flex items-center gap-2"><Smartphone size={16} /> Mobile</span>
            </div>
            <button className="bg-stone-900 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-stone-800 transition-colors shadow-lg shadow-stone-900/10">
              Apply This Theme
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-full text-stone-500 transition-colors ml-2"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Preview Viewport - Simulates a browser window or app container */}
        <div className="flex-1 overflow-y-auto bg-stone-100/50 flex items-center justify-center p-4 md:p-12 relative pattern-grid-lg">
           
           {/* The Actual Form Preview applying the theme styles */}
           <div className={`w-full max-w-3xl shadow-2xl transition-all duration-500 flex flex-col min-h-[600px] rounded-lg overflow-hidden relative ${theme.bgStyle} ${theme.font} ${theme.textColor}`}>
              
              {/* Mock Progress Bar */}
              <div className="h-1.5 w-full bg-current opacity-10">
                 <div className="h-full w-1/3 bg-current opacity-50"></div>
              </div>

              {/* Form Content */}
              <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-12">
                 <div className="mb-8 opacity-60 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    <span>Question 1 of 3</span>
                 </div>
                 
                 <h2 className="text-3xl md:text-5xl font-bold mb-10 leading-[1.1]">
                    How does this theme feel to you?
                 </h2>

                 <div className="space-y-4 max-w-xl">
                    {['Too simple', 'Just right', 'Absolutely perfect'].map((option, idx) => (
                       <label key={option} className={`flex items-center gap-5 p-5 cursor-pointer transition-all hover:opacity-80 group select-none ${theme.inputStyle}`}>
                          <div className={`w-6 h-6 rounded-full border-2 border-current flex items-center justify-center opacity-40 group-hover:opacity-100`}>
                             {idx === 1 && <div className="w-3 h-3 rounded-full bg-current"></div>}
                          </div>
                          <span className="text-xl md:text-2xl font-medium">{option}</span>
                          <span className="ml-auto opacity-0 group-hover:opacity-100 font-mono text-xs uppercase tracking-widest border border-current px-2 py-0.5 rounded">Key {idx + 1}</span>
                       </label>
                    ))}
                 </div>

                 <div className="mt-12 flex items-center gap-4">
                    <button className={`px-10 py-4 text-xl font-bold transition-transform active:scale-95 flex items-center gap-3 ${theme.buttonStyle}`}>
                       Continue <ArrowRight size={22} />
                    </button>
                    <span className="text-xs font-mono uppercase tracking-widest opacity-50 ml-4 hidden md:inline-block">press <strong>Enter ↵</strong></span>
                 </div>
              </div>

              {/* Footer Branding Mock */}
              <div className="absolute bottom-6 right-8 opacity-30 text-xs font-sans font-bold uppercase tracking-widest pointer-events-none">
                 Powered by PaperFill
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

const ThemePreviewCard = ({ theme, onPreview }: { theme: Theme; onPreview: (theme: Theme) => void }) => (
  <div 
    onClick={() => onPreview(theme)}
    className="group bg-white border border-stone-200 hover:border-stone-900 transition-all duration-300 hover:shadow-[6px_6px_0px_0px_rgba(28,25,23,0.1)] cursor-pointer flex flex-col h-full overflow-hidden"
  >
    
    {/* Mini App Preview Area */}
    <div className={`relative h-48 w-full p-6 flex flex-col justify-center items-center overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] ${theme.bgStyle}`}>
      
      {/* Abstract Form UI */}
      <div className={`w-full max-w-[200px] space-y-3 ${theme.textColor}`}>
        <div className={`h-2 w-1/3 opacity-40 rounded bg-current`}></div>
        <div className={`text-xl font-bold leading-tight ${theme.font}`}>
          Hello there.
        </div>
        
        {/* Mock Input */}
        <div className={`w-full h-8 px-2 flex items-center text-xs opacity-60 ${theme.inputStyle}`}>
          Type here...
        </div>

        {/* Mock Button */}
        <div className={`w-20 h-8 flex items-center justify-center text-xs font-bold mt-2 ${theme.buttonStyle}`}>
          Submit
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
         <div className="bg-white text-stone-900 px-4 py-2 rounded-full font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 border border-stone-200 flex items-center gap-2">
           <Maximize2 size={14} /> Preview
         </div>
      </div>
    </div>

    {/* Info Area */}
    <div className="p-5 flex-1 flex flex-col border-t border-stone-100 bg-white">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:underline decoration-1 underline-offset-4">{theme.name}</h3>
        <div className="w-4 h-4 rounded-full border border-stone-200" style={{ backgroundColor: theme.accentColor }}></div>
      </div>
      
      <div className="mt-auto flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-stone-50 border border-stone-200 rounded text-[10px] font-mono uppercase tracking-widest text-stone-500">
          {theme.category}
        </span>
        <span className="px-2 py-1 bg-stone-50 border border-stone-200 rounded text-[10px] font-mono uppercase tracking-widest text-stone-500">
          {theme.font.includes('serif') ? 'Serif' : theme.font.includes('mono') ? 'Mono' : 'Sans'}
        </span>
      </div>
    </div>
  </div>
);

const FilterButton = ({ active, label, onClick }: any) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all whitespace-nowrap border
      ${active 
        ? 'bg-stone-900 text-white border-stone-900' 
        : 'bg-white text-stone-500 border-stone-200 hover:border-stone-900 hover:text-stone-900'}
    `}
  >
    {label}
  </button>
);

// --- Main Page ---

const ThemesPage = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Minimal' | 'Vibrant' | 'Corporate' | 'Dark'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const filteredThemes = themes.filter(t => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-orange-200 selection:text-orange-900 overflow-x-hidden text-stone-800">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] z-0 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}>
      </div>

      <PreviewModal theme={selectedTheme} onClose={() => setSelectedTheme(null)} />

      <div className="relative z-10">
        <Navbar activeLink="Themes" />

        {/* Hero Section */}
        <section className="pt-40 pb-16 px-6 bg-stone-50 border-b border-stone-200">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 text-orange-600 border border-orange-200 bg-orange-50 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest">
                <Palette size={14} /> Design Gallery
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-medium text-stone-900 mb-6 tracking-tight">
                Dress up <br/>
                <span className="italic text-stone-400">your data.</span>
              </h1>
              <p className="text-xl text-stone-600 mb-8 max-w-md leading-relaxed font-light">
                First impressions matter. Choose from our curated collection of themes or mix-and-match to create your own brand kit.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-lg group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900 transition-colors" size={20} />
                <input 
                  type="text"
                  placeholder="Find a style (e.g. 'Dark', 'Minimal')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-stone-300 focus:border-stone-900 outline-none transition-colors shadow-sm font-serif text-lg"
                />
              </div>
            </div>

            {/* Hero Visual: Theme Swatches */}
            <div className="hidden md:block relative h-[400px]">
               {/* Swatch 1 */}
               <div className="absolute right-10 top-10 w-48 h-64 bg-stone-900 shadow-2xl rotate-6 p-4 border border-stone-700 z-10 animate-in slide-in-from-bottom-10 duration-700">
                  <div className="w-full h-full border border-stone-700 flex flex-col justify-center items-center text-white">
                     <span className="font-serif italic text-2xl">Aa</span>
                     <div className="mt-4 w-8 h-8 rounded-full bg-orange-500"></div>
                  </div>
               </div>
               {/* Swatch 2 */}
               <div className="absolute right-32 top-20 w-48 h-64 bg-white shadow-xl -rotate-3 p-4 border border-stone-200 z-20 animate-in slide-in-from-bottom-10 duration-1000 delay-100">
                  <div className="w-full h-full border border-stone-100 flex flex-col justify-center items-center text-stone-900">
                     <span className="font-sans font-bold text-2xl">Aa</span>
                     <div className="mt-4 w-8 h-8 rounded-none bg-blue-600"></div>
                  </div>
               </div>
               {/* Swatch 3 */}
               <div className="absolute right-48 top-4 w-24 h-24 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
            </div>
          </div>
        </section>

        {/* Filters Sticky Bar */}
        <section className="sticky top-20 z-40 bg-[#fdfbf7]/95 backdrop-blur-sm border-b border-stone-200 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
             <div className="flex justify-between items-center gap-6">
               <div className="flex gap-3 min-w-max">
                  <FilterButton active={activeCategory === 'All'} label="All Styles" onClick={() => setActiveCategory('All')} />
                  <FilterButton active={activeCategory === 'Minimal'} label="Minimal" onClick={() => setActiveCategory('Minimal')} />
                  <FilterButton active={activeCategory === 'Corporate'} label="Corporate" onClick={() => setActiveCategory('Corporate')} />
                  <FilterButton active={activeCategory === 'Vibrant'} label="Vibrant" onClick={() => setActiveCategory('Vibrant')} />
                  <FilterButton active={activeCategory === 'Dark'} label="Dark Mode" onClick={() => setActiveCategory('Dark')} />
               </div>
               
               <div className="hidden md:flex items-center gap-2 text-stone-400 text-xs font-mono uppercase">
                  <Monitor size={14} />
                  <span className="mx-1">/</span>
                  <Smartphone size={14} />
               </div>
             </div>
          </div>
        </section>

        {/* Themes Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Custom Theme Card */}
              <div className="group bg-stone-100 border-2 border-dashed border-stone-300 hover:border-stone-900 hover:bg-white transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-8 min-h-[300px]">
                <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:text-white transition-colors mb-4">
                  <Palette size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif font-bold text-xl text-stone-900">Create Custom</h3>
                <p className="text-stone-500 text-sm mt-2 text-center max-w-[200px] font-light">
                  Upload your logo, set your hex codes, and choose your fonts.
                </p>
              </div>

              {filteredThemes.map(theme => (
                <ThemePreviewCard 
                  key={theme.id} 
                  theme={theme} 
                  onPreview={setSelectedTheme} 
                />
              ))}
            </div>

            {filteredThemes.length === 0 && (
              <div className="text-center py-20">
                <h3 className="font-serif text-xl text-stone-900 mb-2">No themes found</h3>
                <p className="text-stone-500 mb-6">Try adjusting your filters.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveCategory('All')}}
                  className="text-stone-900 font-bold underline decoration-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-24 bg-stone-900 text-[#fdfbf7] px-6 border-t border-stone-800">
          <div className="max-w-7xl mx-auto">
             <div className="grid md:grid-cols-3 gap-12 text-center">
                <div className="flex flex-col items-center">
                   <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center mb-6 text-orange-400">
                      <Type size={24} />
                   </div>
                   <h3 className="font-serif font-bold text-xl mb-3">Google Fonts</h3>
                   <p className="text-stone-400 font-light text-sm leading-relaxed max-w-xs">
                      Access the entire Google Fonts library to match your brand's typography perfectly.
                   </p>
                </div>
                <div className="flex flex-col items-center">
                   <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center mb-6 text-blue-400">
                      <Layout size={24} />
                   </div>
                   <h3 className="font-serif font-bold text-xl mb-3">CSS Customization</h3>
                   <p className="text-stone-400 font-light text-sm leading-relaxed max-w-xs">
                      Need pixel-perfect control? Developers can inject custom CSS to override any style.
                   </p>
                </div>
                <div className="flex flex-col items-center">
                   <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center mb-6 text-green-400">
                      <Droplet size={24} />
                   </div>
                   <h3 className="font-serif font-bold text-xl mb-3">Unsplash Integration</h3>
                   <p className="text-stone-400 font-light text-sm leading-relaxed max-w-xs">
                      Search millions of high-quality, royalty-free images for your form backgrounds instantly.
                   </p>
                </div>
             </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default ThemesPage;