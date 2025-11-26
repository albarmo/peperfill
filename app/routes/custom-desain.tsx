import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  Type, 
  Palette, 
  Layout, 
  Save, 
  Undo, 
  Redo, 
  Check, 
  ChevronDown,
  Image as ImageIcon,
  Monitor,
  Smartphone,
  Maximize2,
  Grid,
  Layers,
  Move,
  BoxSelect,
  Plus,
  GripVertical,
  Trash2,
  Heading,
  List,
  Star,
  Calendar,
  Type as TypeIcon,
  MousePointer2,
  X
} from 'lucide-react';

// --- Types ---

interface ThemeState {
  logo: string | null;
  fontFamily: 'font-serif' | 'font-sans' | 'font-mono';
  fontScale: 'text-sm' | 'text-base' | 'text-lg';
  backgroundColor: string;
  bgPattern: 'none' | 'dots' | 'grid' | 'noise';
  questionColor: string;
  answerColor: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonStyle: 'solid' | 'outline' | 'ghost';
  borderRadius: 'rounded-none' | 'rounded-md' | 'rounded-full';
  shadowStrength: 'none' | 'soft' | 'hard';
  density: 'compact' | 'spacious';
  bgImage: string | null;
}

interface FormBlock {
  id: string;
  type: 'welcome' | 'choice' | 'text' | 'rating' | 'date';
  label: string;
  title: string;
  options?: string[];
  placeholder?: string;
}

// --- Components ---

const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
  <div className="flex items-center justify-between group">
    <label className="text-sm font-medium text-stone-600">{label}</label>
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase">{value}</span>
      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-stone-200 shadow-sm hover:scale-110 transition-transform cursor-pointer">
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
        />
      </div>
    </div>
  </div>
);

const OptionButton = ({ label, active, onClick, icon: Icon }: any) => (
  <button 
    onClick={onClick}
    className={`
      flex-1 py-2 px-3 text-xs font-medium border transition-all duration-200 flex items-center justify-center gap-2
      ${active 
        ? 'bg-stone-900 text-white border-stone-900 shadow-md' 
        : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'}
    `}
  >
    {Icon && <Icon size={14} />}
    <span>{label}</span>
  </button>
);

const PatternOption = ({ pattern, active, onClick }: any) => {
  const getPatternStyle = () => {
    switch(pattern) {
      case 'dots': return { backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '8px 8px', opacity: 0.2 };
      case 'grid': return { backgroundImage: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)', backgroundSize: '10px 10px', opacity: 0.1 };
      case 'noise': return { backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`, opacity: 0.4 };
      default: return {};
    }
  };

  return (
    <button 
      onClick={onClick}
      className={`
        relative w-12 h-12 rounded border-2 transition-all overflow-hidden bg-stone-50
        ${active ? 'border-stone-900 ring-2 ring-stone-900 ring-offset-1' : 'border-stone-200 hover:border-stone-400'}
      `}
    >
      {pattern === 'none' && <div className="absolute inset-0 flex items-center justify-center text-stone-400"><Check size={16}/></div>}
      <div className="absolute inset-0" style={getPatternStyle()}></div>
    </button>
  );
};

const DraggableBlock = ({ type, label, icon: Icon }: { type: string, label: string, icon: any }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('blockType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div 
      draggable 
      onDragStart={handleDragStart}
      className="flex items-center gap-3 p-4 bg-white border border-stone-200 rounded-lg cursor-grab active:cursor-grabbing hover:border-stone-900 hover:shadow-md transition-all group"
    >
      <div className="w-8 h-8 bg-stone-50 rounded flex items-center justify-center text-stone-500 group-hover:bg-stone-900 group-hover:text-white transition-colors">
        <Icon size={16} />
      </div>
      <span className="font-medium text-sm text-stone-700">{label}</span>
      <GripVertical size={16} className="ml-auto text-stone-300" />
    </div>
  );
};

// --- Main Editor Page ---

const CreateThemePage = () => {
  const [activeTab, setActiveTab] = useState<'design' | 'build'>('design');
  const [theme, setTheme] = useState<ThemeState>({
    logo: null,
    fontFamily: 'font-serif',
    fontScale: 'text-base',
    backgroundColor: '#fdfbf7',
    bgPattern: 'none',
    questionColor: '#1c1917',
    answerColor: '#1c1917',
    buttonColor: '#1c1917',
    buttonTextColor: '#ffffff',
    buttonStyle: 'solid',
    borderRadius: 'rounded-none',
    shadowStrength: 'soft',
    density: 'spacious',
    bgImage: null
  });

  const [blocks, setBlocks] = useState<FormBlock[]>([
    { 
      id: '1', 
      type: 'choice', 
      label: 'Question 1', 
      title: 'How likely are you to recommend us to a friend?', 
      options: ['Extremely Likely', 'Somewhat Likely', 'Not Likely'] 
    }
  ]);

  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTheme({ ...theme, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const type = e.dataTransfer.getData('blockType') as FormBlock['type'];
    
    if (type) {
      const newBlock: FormBlock = {
        id: Date.now().toString(),
        type,
        label: `Question ${blocks.length + 1}`,
        title: type === 'rating' ? 'How would you rate your experience?' 
             : type === 'text' ? 'What is your name?' 
             : type === 'date' ? 'When is your birthday?'
             : 'New Question',
        options: type === 'choice' ? ['Option A', 'Option B', 'Option C'] : undefined,
        placeholder: type === 'text' ? 'Type your answer here...' : undefined
      };
      setBlocks([...blocks, newBlock]);
    }
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  // Helper to generate styles based on state
  const getShadowClass = () => {
    switch (theme.shadowStrength) {
      case 'none': return 'shadow-none';
      case 'soft': return 'shadow-sm';
      case 'hard': return 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-stone-900';
      default: return 'shadow-none';
    }
  };

  const getButtonStyle = () => {
    const base = `px-8 py-3 text-lg font-bold transition-transform active:scale-95 flex items-center justify-center gap-2 ${theme.borderRadius} ${getShadowClass()}`;
    
    if (theme.buttonStyle === 'solid') {
      return { className: base, style: { backgroundColor: theme.buttonColor, color: theme.buttonTextColor } };
    } else if (theme.buttonStyle === 'outline') {
      return { className: `${base} border-2`, style: { borderColor: theme.buttonColor, color: theme.buttonColor, backgroundColor: 'transparent' } };
    } else {
      return { className: `${base} hover:bg-black/5`, style: { color: theme.buttonColor, backgroundColor: 'transparent', boxShadow: 'none', border: 'none' } };
    }
  };

  const getBackgroundStyle = () => {
     let patternStyle = {};
     switch(theme.bgPattern) {
        case 'dots': patternStyle = { backgroundImage: `radial-gradient(${theme.questionColor}20 1px, transparent 1px)`, backgroundSize: '20px 20px' }; break;
        case 'grid': patternStyle = { backgroundImage: `linear-gradient(${theme.questionColor}10 1px, transparent 1px), linear-gradient(90deg, ${theme.questionColor}10 1px, transparent 1px)`, backgroundSize: '30px 30px' }; break;
        case 'noise': patternStyle = { backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")` }; break;
     }
     return { backgroundColor: theme.backgroundColor, ...patternStyle };
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-[#f5f3ef] overflow-hidden font-sans text-stone-800">
      
      {/* --- Sidebar --- */}
      <aside className="w-full md:w-[420px] flex flex-col bg-white border-r border-stone-200 h-full z-20 shadow-xl">
        
        {/* Header with Tabs */}
        <div className="shrink-0 bg-white">
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-2 -ml-2 hover:bg-stone-100 rounded-full text-stone-500 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h1 className="font-serif font-bold text-xl">Theme Editor</h1>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-stone-400 hover:text-stone-900"><Undo size={18} /></button>
            </div>
          </div>
          
          <div className="flex border-b border-stone-200">
            <button 
              onClick={() => setActiveTab('design')}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'design' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
            >
              <Palette size={16} /> Design
            </button>
            <button 
              onClick={() => setActiveTab('build')}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'build' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
            >
              <BoxSelect size={16} /> Build
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-stone-50/50">
          
          {/* TAB: DESIGN */}
          {activeTab === 'design' && (
            <div className="p-6 space-y-10">
              
              {/* Brand */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-2">
                  <ImageIcon size={14} /> Brand Assets
                </div>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-200 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-stone-900 hover:bg-stone-50 transition-all group relative overflow-hidden bg-white"
                >
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  {theme.logo ? (
                    <div className="relative w-full h-16 flex items-center justify-center">
                      <img src={theme.logo} alt="Logo" className="max-h-full max-w-full object-contain" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); setTheme({...theme, logo: null}); }}
                        className="absolute -top-4 -right-4 bg-stone-900 text-white rounded-bl-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mb-3 group-hover:bg-white group-hover:text-stone-900 transition-colors">
                        <Upload size={18} />
                      </div>
                      <p className="text-sm font-medium text-stone-600">Upload Logo</p>
                    </>
                  )}
                </div>
              </section>

              {/* Typography */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-2">
                  <Type size={14} /> Typography
                </div>
                <div className="space-y-4">
                   <div className="flex gap-2">
                    <OptionButton label="Serif" active={theme.fontFamily === 'font-serif'} onClick={() => setTheme({...theme, fontFamily: 'font-serif'})} />
                    <OptionButton label="Sans" active={theme.fontFamily === 'font-sans'} onClick={() => setTheme({...theme, fontFamily: 'font-sans'})} />
                    <OptionButton label="Mono" active={theme.fontFamily === 'font-mono'} onClick={() => setTheme({...theme, fontFamily: 'font-mono'})} />
                  </div>
                   <div className="flex gap-2">
                    <OptionButton label="Small" active={theme.fontScale === 'text-sm'} onClick={() => setTheme({...theme, fontScale: 'text-sm'})} />
                    <OptionButton label="Medium" active={theme.fontScale === 'text-base'} onClick={() => setTheme({...theme, fontScale: 'text-base'})} />
                    <OptionButton label="Large" active={theme.fontScale === 'text-lg'} onClick={() => setTheme({...theme, fontScale: 'text-lg'})} />
                  </div>
                </div>
              </section>

              {/* Colors */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-2">
                  <Palette size={14} /> Colors
                </div>
                <div className="bg-white p-4 rounded-lg border border-stone-100 space-y-4 shadow-sm">
                  <ColorInput label="Background" value={theme.backgroundColor} onChange={(val) => setTheme({...theme, backgroundColor: val})} />
                  <ColorInput label="Questions" value={theme.questionColor} onChange={(val) => setTheme({...theme, questionColor: val})} />
                  <ColorInput label="Answers" value={theme.answerColor} onChange={(val) => setTheme({...theme, answerColor: val})} />
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-stone-600 mb-2 block">Texture Overlay</label>
                  <div className="flex gap-3">
                    <PatternOption pattern="none" active={theme.bgPattern === 'none'} onClick={() => setTheme({...theme, bgPattern: 'none'})} />
                    <PatternOption pattern="dots" active={theme.bgPattern === 'dots'} onClick={() => setTheme({...theme, bgPattern: 'dots'})} />
                    <PatternOption pattern="grid" active={theme.bgPattern === 'grid'} onClick={() => setTheme({...theme, bgPattern: 'grid'})} />
                    <PatternOption pattern="noise" active={theme.bgPattern === 'noise'} onClick={() => setTheme({...theme, bgPattern: 'noise'})} />
                  </div>
                </div>
              </section>

              {/* Buttons */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-2">
                  <MousePointer2 size={14} /> Buttons
                </div>
                <div className="space-y-5">
                   <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg border border-stone-100 shadow-sm">
                      <ColorInput label="Button Color" value={theme.buttonColor} onChange={(val) => setTheme({...theme, buttonColor: val})} />
                      <ColorInput label="Text Color" value={theme.buttonTextColor} onChange={(val) => setTheme({...theme, buttonTextColor: val})} />
                   </div>
                   <div className="flex gap-2">
                      <OptionButton label="Solid" active={theme.buttonStyle === 'solid'} onClick={() => setTheme({...theme, buttonStyle: 'solid'})} />
                      <OptionButton label="Outline" active={theme.buttonStyle === 'outline'} onClick={() => setTheme({...theme, buttonStyle: 'outline'})} />
                      <OptionButton label="Ghost" active={theme.buttonStyle === 'ghost'} onClick={() => setTheme({...theme, buttonStyle: 'ghost'})} />
                   </div>
                   <div className="flex gap-2">
                       <OptionButton label="Sharp" active={theme.borderRadius === 'rounded-none'} onClick={() => setTheme({...theme, borderRadius: 'rounded-none'})} />
                       <OptionButton label="Soft" active={theme.borderRadius === 'rounded-md'} onClick={() => setTheme({...theme, borderRadius: 'rounded-md'})} />
                       <OptionButton label="Round" active={theme.borderRadius === 'rounded-full'} onClick={() => setTheme({...theme, borderRadius: 'rounded-full'})} />
                    </div>
                </div>
              </section>
            </div>
          )}

          {/* TAB: BUILD (Drag & Drop) */}
          {activeTab === 'build' && (
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 flex items-start gap-3">
                 <div className="mt-0.5 text-blue-500"><Monitor size={16} /></div>
                 <div>
                    <h4 className="text-sm font-bold text-blue-900 mb-1">Drag to Preview</h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                       Drag elements from this list and drop them onto the preview screen on the right to add them to your form.
                    </p>
                 </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-2 pl-1">Basic Fields</div>
                <DraggableBlock type="choice" label="Multiple Choice" icon={List} />
                <DraggableBlock type="text" label="Short Text" icon={TypeIcon} />
                <DraggableBlock type="rating" label="Rating" icon={Star} />
                <DraggableBlock type="date" label="Date Picker" icon={Calendar} />
              </div>

              <div className="space-y-3 mt-8">
                <div className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-2 pl-1">Structure</div>
                <DraggableBlock type="welcome" label="Welcome Screen" icon={Heading} />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-stone-200 bg-stone-50 shrink-0">
          <button className="w-full bg-stone-900 text-white py-3.5 rounded font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-lg active:translate-y-0.5">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </aside>

      {/* --- Live Preview Area --- */}
      <main className="flex-1 relative flex flex-col overflow-hidden">
        
        {/* Toolbar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur border border-stone-200 shadow-sm rounded-full px-4 py-2 flex items-center gap-4 z-10">
           <button 
             onClick={() => setPreviewMode('desktop')}
             className={`p-2 rounded-full transition-colors ${previewMode === 'desktop' ? 'bg-stone-100 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
           >
             <Monitor size={18} />
           </button>
           <div className="w-px h-4 bg-stone-200"></div>
           <button 
             onClick={() => setPreviewMode('mobile')}
             className={`p-2 rounded-full transition-colors ${previewMode === 'mobile' ? 'bg-stone-100 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
           >
             <Smartphone size={18} />
           </button>
        </div>

        {/* Canvas Background */}
        <div className="flex-1 bg-stone-200/50 flex items-center justify-center p-8 overflow-y-auto relative pattern-grid-lg">
          
          {/* Simulated Device/Container */}
          <div 
             className={`
               bg-white shadow-2xl transition-all duration-500 overflow-hidden relative border border-black/5 flex flex-col
               ${previewMode === 'mobile' ? 'w-[375px] h-[700px] rounded-[3rem] border-8 border-stone-900' : 'w-full max-w-4xl h-[650px] rounded-lg'}
             `}
             style={getBackgroundStyle()}
             onDragOver={(e) => {
               e.preventDefault();
               setIsDraggingOver(true);
             }}
             onDragLeave={() => setIsDraggingOver(false)}
             onDrop={handleDrop}
          >
             
             {/* Drop Zone Indicator overlay */}
             {isDraggingOver && (
                <div className="absolute inset-0 bg-blue-500/20 z-50 flex items-center justify-center border-4 border-blue-500 border-dashed m-4 rounded-lg pointer-events-none">
                   <div className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-bounce">
                      Drop to Add Element
                   </div>
                </div>
             )}

             {/* --- The Form Content --- */}
             <div className={`flex-1 flex flex-col ${theme.fontFamily} ${theme.fontScale} p-8 md:p-16 overflow-y-auto relative transition-all`}>
                
                {/* Logo Area */}
                <div className={`${theme.density === 'compact' ? 'mb-6' : 'mb-12'}`}>
                   {theme.logo ? (
                     <img src={theme.logo} alt="Brand Logo" className="h-12 object-contain" />
                   ) : (
                     <div className="h-12 flex items-center font-bold text-xl opacity-20 border-2 border-dashed border-current px-4 w-fit rounded">Your Logo</div>
                   )}
                </div>

                {/* Progress */}
                <div className={`w-full h-1 bg-current opacity-10 rounded-full overflow-hidden ${theme.density === 'compact' ? 'mb-8' : 'mb-12'}`} style={{ color: theme.questionColor }}>
                   <div className="h-full w-1/3 bg-current opacity-100" style={{ color: theme.buttonColor }}></div>
                </div>

                {/* Blocks Rendering */}
                <div className="flex-1 space-y-16">
                   {blocks.map((block, index) => (
                      <div key={block.id} className="relative group/block animate-in fade-in slide-in-from-bottom-4">
                         
                         {/* Delete Button (Hover) */}
                         <button 
                            onClick={() => removeBlock(block.id)}
                            className="absolute -right-10 top-0 p-2 text-red-400 hover:text-red-600 opacity-0 group-hover/block:opacity-100 transition-opacity"
                            title="Remove Block"
                         >
                            <Trash2 size={18} />
                         </button>

                         <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-4 opacity-60" style={{ color: theme.questionColor }}>
                            <span>{block.label}</span>
                         </div>
                         
                         <h2 className="text-3xl font-bold mb-6 leading-tight" style={{ color: theme.questionColor }}>
                            {block.title}
                         </h2>

                         {/* Render based on type */}
                         <div className={`space-y-3 max-w-md ${theme.density === 'compact' ? 'text-base' : ''}`}>
                            
                            {block.type === 'choice' && block.options?.map((opt, i) => (
                              <div 
                                key={i} 
                                className={`
                                  flex items-center gap-4 border transition-all cursor-pointer hover:opacity-80
                                  ${theme.borderRadius}
                                  ${theme.density === 'compact' ? 'p-3' : 'p-4'}
                                  ${getShadowClass()}
                                `}
                                style={{ 
                                  borderColor: theme.answerColor,
                                  color: theme.answerColor,
                                  backgroundColor: 'transparent'
                                }}
                              >
                                 <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center opacity-60"></div>
                                 <span className="font-medium">{opt}</span>
                              </div>
                            ))}

                            {block.type === 'text' && (
                               <input 
                                  type="text" 
                                  placeholder={block.placeholder}
                                  className={`
                                    w-full bg-transparent border-b-2 outline-none py-2 text-xl placeholder:opacity-50
                                    ${theme.fontFamily}
                                  `}
                                  style={{ borderColor: theme.answerColor, color: theme.answerColor }}
                                  disabled
                               />
                            )}

                            {block.type === 'rating' && (
                               <div className="flex gap-2">
                                  {[1,2,3,4,5].map(num => (
                                     <div 
                                        key={num}
                                        className={`
                                           w-12 h-12 flex items-center justify-center border-2 cursor-pointer hover:bg-black/5
                                           ${theme.borderRadius}
                                        `}
                                        style={{ borderColor: theme.answerColor, color: theme.answerColor }}
                                     >
                                        {num}
                                     </div>
                                  ))}
                               </div>
                            )}

                             {block.type === 'date' && (
                               <div 
                                  className={`
                                     flex items-center gap-3 border p-4 opacity-70
                                     ${theme.borderRadius}
                                  `}
                                  style={{ borderColor: theme.answerColor, color: theme.answerColor }}
                               >
                                  <Calendar size={20} />
                                  <span>MM / DD / YYYY</span>
                               </div>
                            )}
                         </div>
                      </div>
                   ))}
                </div>

                {/* Navigation */}
                <div className="mt-12 flex items-center justify-between pt-8 border-t border-black/5">
                   <button 
                     className={getButtonStyle().className}
                     style={getButtonStyle().style}
                   >
                     OK
                   </button>
                   <div className="text-xs opacity-40 font-mono" style={{ color: theme.questionColor }}>powered by PaperFill</div>
                </div>

             </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default CreateThemePage;