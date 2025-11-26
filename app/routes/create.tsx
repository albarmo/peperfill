import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Settings,
  Type,
  AlignLeft,
  Hash,
  ListChecks,
  CalendarDays,
  Mail,
  MoreHorizontal,
  ChevronRight,
  Image as ImageIcon,
  Video,
  Check,
  ArrowRight,
  Trash2,
  Copy,
  Eye,
  X,
  GripVertical,
  GitBranch,
  Palette,
  Share2,
  BarChart3,
  Link as LinkIcon,
  Code,
  Download,
  PieChart,
  Split,
  Calculator,
  Search,
  User,
  Phone,
  MapPin,
  Globe,
  ChevronDown,
  CheckCircle2,
  Scale,
  CheckSquare,
  Trophy,
  BarChartHorizontal,
  Star,
  ListOrdered,
  Grid,
  Sparkles,
  CreditCard,
  Upload,
  HardDrive,
  CalendarCheck,
  LayoutTemplate,
  Flag,
  Quote,
  Folder,
  LogOut,
  MessageSquare,
  Laptop,
  Smartphone,
  Tablet
} from 'lucide-react';

// --- TYPES ---

type FieldType = 'text' | 'long_text' | 'multiple_choice' | 'email' | 'number' | 'date' | 'phone' | 'website' | 'rating' | 'yes_no' | 'dropdown' | 'nps' | 'opinion' | 'legal';

interface FieldTypeDefinition {
  type: FieldType;
  label: string;
  icon: React.ReactNode;
  color: string;
  description?: string;
}

interface ElementCategory {
  title: string;
  items: {
    type: FieldType | string;
    label: string;
    icon: React.ReactNode;
    isPro?: boolean;
    color?: string;
  }[];
}

interface Theme {
  id: string;
  name: string;
  bg: string;
  text: string;
  btn: string;
  accent: string;
}

interface LogicRule {
  id: string;
  condition: string; // value to match
  jumpTo: string; // field id
}

interface Field {
  id: string;
  type: FieldType;
  label: string;
  description?: string;
  required: boolean;
  placeholder?: string;
  options?: string[]; // For choice based
  logic?: LogicRule[];
}

type Tab = 'content' | 'workflow' | 'design' | 'share' | 'results';
type RightSidebarTab = 'question' | 'design' | 'logic';
type ViewMode = 'desktop' | 'tablet' | 'mobile';

// --- CONFIGURATION ---

const ELEMENT_CATEGORIES: ElementCategory[] = [
  {
    title: 'Recommended',
    items: [
      { type: 'text', label: 'Short Text', icon: <Type className="w-4 h-4" />, color: 'text-blue-500' },
      { type: 'multiple_choice', label: 'Multiple Choice', icon: <ListChecks className="w-4 h-4" />, color: 'text-purple-500' },
      { type: 'email', label: 'Email', icon: <Mail className="w-4 h-4" />, color: 'text-pink-500' },
    ]
  },
  {
    title: 'Contact info',
    items: [
      { type: 'phone', label: 'Phone Number', icon: <Phone className="w-4 h-4" />, color: 'text-pink-500' },
      { type: 'website', label: 'Website', icon: <Globe className="w-4 h-4" />, color: 'text-pink-500' },
    ]
  },
  {
    title: 'Choice',
    items: [
      { type: 'dropdown', label: 'Dropdown', icon: <ChevronDown className="w-4 h-4" />, color: 'text-purple-500' },
      { type: 'yes_no', label: 'Yes/No', icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-purple-500' },
      { type: 'legal', label: 'Legal', icon: <Scale className="w-4 h-4" />, color: 'text-purple-500' },
    ]
  },
  {
    title: 'Rating & ranking',
    items: [
      { type: 'nps', label: 'Net Promoter Score®', icon: <Trophy className="w-4 h-4" />, color: 'text-green-600' },
      { type: 'rating', label: 'Rating', icon: <Star className="w-4 h-4" />, color: 'text-green-600' },
    ]
  },
  {
    title: 'Text & Video',
    items: [
      { type: 'long_text', label: 'Long Text', icon: <AlignLeft className="w-4 h-4" />, color: 'text-blue-500' },
    ]
  },
  {
    title: 'Other',
    items: [
      { type: 'number', label: 'Number', icon: <Hash className="w-4 h-4" />, color: 'text-yellow-500' },
      { type: 'date', label: 'Date', icon: <CalendarDays className="w-4 h-4" />, color: 'text-yellow-500' },
    ]
  }
];

const THEMES: Theme[] = [
  { id: 'default', name: 'Default', bg: 'bg-white', text: 'text-gray-900', btn: 'bg-black text-white', accent: 'text-black' },
  { id: 'dark', name: 'Midnight', bg: 'bg-gray-900', text: 'text-white', btn: 'bg-blue-600 text-white', accent: 'text-blue-400' },
  { id: 'sand', name: 'Sand', bg: 'bg-[#fdf6e3]', text: 'text-[#586e75]', btn: 'bg-[#b58900] text-white', accent: 'text-[#b58900]' },
  { id: 'forest', name: 'Forest', bg: 'bg-[#002b36]', text: 'text-[#839496]', btn: 'bg-[#2aa198] text-white', accent: 'text-[#2aa198]' },
];

// --- COMPONENTS ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('content');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [fields, setFields] = useState<Field[]>([
    { 
      id: '1', 
      type: 'text', 
      label: 'Hello, what is your name?', 
      description: 'We will use this to contact you.',
      required: true,
      placeholder: 'Type your answer here...'
    },
    { 
      id: '2', 
      type: 'multiple_choice', 
      label: 'Which department fits you best?', 
      required: false,
      options: ['Engineering', 'Design', 'Product', 'Marketing']
    }
  ]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>('1');
  const [rightSidebarTab, setRightSidebarTab] = useState<RightSidebarTab>('question');
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(THEMES[0]);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // --- ACTIONS ---

  const addField = (type: string, label: string) => {
    let internalType: FieldType = 'text';
    if (['text', 'long_text', 'multiple_choice', 'email', 'number', 'date', 'phone', 'website', 'rating', 'yes_no', 'dropdown', 'nps', 'legal'].includes(type)) {
        internalType = type as FieldType;
    }

    const newField: Field = {
      id: Date.now().toString(),
      type: internalType,
      label: label === 'Short Text' ? 'New Question' : label,
      description: '',
      required: false,
      options: ['multiple_choice', 'dropdown'].includes(type) ? ['Option 1', 'Option 2'] : undefined,
      placeholder: 'Type your answer here...'
    };
    const newFields = [...fields, newField];
    setFields(newFields);
    setSelectedFieldId(newField.id);
    setIsAddMenuOpen(false);
    setSearchTerm('');
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const deleteField = (id: string) => {
    const newFields = fields.filter(f => f.id !== id);
    setFields(newFields);
    if (selectedFieldId === id && newFields.length > 0) {
      setSelectedFieldId(newFields[newFields.length - 1].id);
    } else if (newFields.length === 0) {
      setSelectedFieldId(null);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://form.typeform.com/to/xq9sK");
    alert("Link copied to clipboard!");
  };

  // --- DRAG AND DROP HANDLERS ---
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === dropIndex) return;
    const newFields = [...fields];
    const [draggedItem] = newFields.splice(draggedItemIndex, 1);
    newFields.splice(dropIndex, 0, draggedItem);
    setFields(newFields);
    setDraggedItemIndex(null);
  };

  const selectedField = fields.find(f => f.id === selectedFieldId);

  // --- RENDER HELPERS ---

  const getFieldIcon = (type: string) => {
     switch(type) {
         case 'text': return <Type className="w-4 h-4" />;
         case 'long_text': return <AlignLeft className="w-4 h-4" />;
         case 'multiple_choice': return <ListChecks className="w-4 h-4" />;
         case 'email': return <Mail className="w-4 h-4" />;
         case 'number': return <Hash className="w-4 h-4" />;
         case 'date': return <CalendarDays className="w-4 h-4" />;
         case 'phone': return <Phone className="w-4 h-4" />;
         case 'rating': return <Star className="w-4 h-4" />;
         case 'yes_no': return <CheckCircle2 className="w-4 h-4" />;
         case 'dropdown': return <ChevronDown className="w-4 h-4" />;
         case 'nps': return <Trophy className="w-4 h-4" />;
         default: return <Type className="w-4 h-4" />;
     }
  };

  // --- PREVIEW RENDERERS ---

  const renderFieldInputPreview = (field: Field, theme: Theme = THEMES[0]) => {
     const inputBaseClass = `w-full bg-transparent border-b border-gray-300 py-2 text-xl outline-none focus:border-black transition-colors placeholder-opacity-50 placeholder-current ${theme.text}`;
     
     switch(field.type) {
        case 'text':
        case 'phone':
        case 'website':
            return <input type="text" className={inputBaseClass} placeholder={field.placeholder} disabled />;
        case 'email':
            return <input type="email" className={inputBaseClass} placeholder="name@example.com" disabled />;
        case 'number':
            return <input type="number" className={inputBaseClass} placeholder="0" disabled />;
        case 'date':
            return <input type="date" className={inputBaseClass} disabled />;
        case 'long_text':
             return <textarea className={`w-full bg-transparent border rounded-md p-3 text-lg outline-none focus:border-black transition-colors resize-none h-32 ${theme.text} border-gray-300`} placeholder={field.placeholder} disabled />;
        case 'multiple_choice':
             return (
               <div className="space-y-3">
                 {field.options?.map((opt, idx) => (
                   <div key={idx} className={`flex items-center gap-3 p-3 border border-opacity-30 rounded cursor-pointer hover:bg-opacity-5 transition w-full max-w-md ${theme.text} border-current bg-current bg-opacity-0`}>
                     <div className={`w-6 h-6 border border-current rounded flex items-center justify-center text-xs font-bold`}>
                       {String.fromCharCode(65 + idx)}
                     </div>
                     <span className="font-medium">{opt}</span>
                   </div>
                 ))}
               </div>
             );
        case 'dropdown':
             return (
                 <div className="relative w-full max-w-md">
                    <div className={`w-full p-3 border border-opacity-30 rounded flex items-center justify-between ${theme.text} border-current`}>
                        <span className="opacity-50">Select an option...</span>
                        <ChevronDown className="w-5 h-5" />
                    </div>
                 </div>
             );
        case 'yes_no':
             return (
               <div className="flex gap-4">
                  <div className={`flex items-center gap-3 p-3 border border-opacity-30 rounded cursor-pointer w-32 justify-center ${theme.text} border-current`}>
                     <span className="font-bold">Y</span> Yes
                  </div>
                  <div className={`flex items-center gap-3 p-3 border border-opacity-30 rounded cursor-pointer w-32 justify-center ${theme.text} border-current`}>
                     <span className="font-bold">N</span> No
                  </div>
               </div>
             );
        case 'rating':
             return (
                <div className="flex gap-2">
                   {[1, 2, 3, 4, 5].map(i => (
                       <Star key={i} className={`w-8 h-8 cursor-pointer opacity-30 hover:opacity-100 transition ${theme.text}`} />
                   ))}
                </div>
             );
        case 'nps':
             return (
                <div className="flex flex-wrap gap-2">
                   {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                      <div key={i} className={`w-10 h-10 border border-opacity-30 rounded flex items-center justify-center cursor-pointer hover:bg-opacity-10 hover:bg-current transition ${theme.text} border-current`}>
                         {i}
                      </div>
                   ))}
                </div>
             );
         case 'legal':
             return (
                <div className={`flex items-start gap-3 p-4 border border-opacity-30 rounded ${theme.text} border-current`}>
                   <Scale className="w-6 h-6 mt-1" />
                   <div>
                       <p className="font-medium">I accept the Terms and Conditions</p>
                       <div className="mt-2 flex gap-4">
                           <button className={`px-4 py-1 rounded border border-current hover:bg-opacity-10 hover:bg-current`}>I accept</button>
                           <button className={`px-4 py-1 rounded border border-current hover:bg-opacity-10 hover:bg-current`}>I don't accept</button>
                       </div>
                   </div>
                </div>
             );
        default:
            return <input type="text" className={inputBaseClass} placeholder="Answer..." disabled />;
     }
  };

  // --- VIEWS ---

  const renderContentTab = () => (
    <div className="flex flex-1 overflow-hidden relative">
        
        {/* ADD CONTENT MODAL OVERLAY */}
        {isAddMenuOpen && (
            <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center p-8 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                        <div className="flex gap-6">
                            <button className="text-black font-semibold border-b-2 border-black pb-4 -mb-4.5 px-1">Add form elements</button>
                            <button className="text-gray-500 hover:text-black font-medium pb-4 -mb-4.5 px-1 transition">Import questions</button>
                        </div>
                        <button onClick={() => setIsAddMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-hidden flex flex-col">
                        <div className="p-6 pb-2">
                             <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search form elements" 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full max-w-sm pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                                />
                             </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 pt-2">
                             <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                                {ELEMENT_CATEGORIES.map((category, idx) => {
                                    const filteredItems = category.items.filter(item => 
                                        item.label.toLowerCase().includes(searchTerm.toLowerCase())
                                    );
                                    if (filteredItems.length === 0) return null;

                                    return (
                                        <div key={idx} className="break-inside-avoid mb-8">
                                            <h3 className="font-bold text-gray-900 mb-3 text-sm">{category.title}</h3>
                                            <div className="space-y-1">
                                                {filteredItems.map((item, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => addField(item.type, item.label)}
                                                        className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-100 group transition-colors text-left"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`${item.color || 'text-gray-500'} group-hover:text-black transition-colors`}>
                                                                {item.icon}
                                                            </div>
                                                            <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium">{item.label}</span>
                                                        </div>
                                                        {item.isPro && (
                                                           <div className="w-4 h-4 rounded-sm border border-emerald-500 flex items-center justify-center">
                                                              <div className="w-2 h-2 bg-emerald-500 rotate-45"></div>
                                                           </div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* 2. LEFT SIDEBAR (SLIDE/FLOW VIEW) */}
        <aside className="w-64 bg-white border-r flex flex-col z-20">
          <div className="p-4 border-b">
             <button 
               onClick={() => setIsAddMenuOpen(true)}
               className="flex items-center justify-center gap-2 w-full py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition shadow-sm active:scale-95 duration-100"
             >
               <Plus className="w-4 h-4" /> Add content
             </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {fields.map((field, index) => {
              const isDragging = draggedItemIndex === index;

              return (
                <div 
                  key={field.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onClick={() => setSelectedFieldId(field.id)}
                  className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                    selectedFieldId === field.id 
                      ? 'bg-white border-gray-300 shadow-sm ring-1 ring-gray-200' 
                      : 'bg-transparent border-transparent hover:bg-gray-100'
                  } ${isDragging ? 'opacity-50 dashed border-2 border-gray-300' : ''}`}
                >
                  <div className="hidden group-hover:flex text-gray-300 cursor-move -ml-2">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 ${
                    selectedFieldId === field.id ? 'bg-black text-white' : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                  } ${isDragging ? 'invisible' : ''} group-hover:ml-0`}>
                    {index + 1}
                  </div>
                  <div className="p-1.5 rounded bg-gray-100 text-gray-600">
                    {getFieldIcon(field.type)}
                  </div>
                  <div className="truncate text-sm font-medium text-gray-700 flex-1 select-none">
                    {field.label}
                  </div>
                  {selectedFieldId === field.id && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteField(field.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
             {/* Endings Section */}
            <div className="mt-8 pt-4 border-t border-dashed px-2">
               <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Endings</h3>
               <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer opacity-60">
                  <div className="w-6 h-6 rounded bg-gray-800 text-white flex items-center justify-center text-xs">A</div>
                  <div className="text-sm">Thank You Screen</div>
               </div>
            </div>
          </div>
        </aside>

        {/* 3. CENTER CANVAS (PREVIEW) */}
        <main className="flex-1 bg-gray-50 relative flex flex-col items-center">
          {/* Toolbar */}
          <div className="w-full h-12 border-b bg-white/50 backdrop-blur-sm flex items-center justify-center px-4 gap-4 text-sm text-gray-600 z-10">
             <span className="font-medium text-black">Universal mode</span>
             <div className="h-4 w-px bg-gray-300"></div>
             <button onClick={() => setViewMode('desktop')} className={`hover:text-black transition ${viewMode === 'desktop' ? 'text-black' : ''}`}><MonitorIcon /></button>
             <button onClick={() => setViewMode('tablet')} className={`hover:text-black transition ${viewMode === 'tablet' ? 'text-black' : ''}`}><TabletIcon /></button>
             <button onClick={() => setViewMode('mobile')} className={`hover:text-black transition ${viewMode === 'mobile' ? 'text-black' : ''}`}><SmartphoneIcon /></button>
          </div>

          <div className="flex-1 w-full overflow-y-auto bg-gray-50 flex items-center justify-center p-8">
             {selectedField ? (
               <div className={`w-full transition-all duration-300 ease-in-out ${viewMode === 'mobile' ? 'max-w-sm' : viewMode === 'tablet' ? 'max-w-2xl' : 'max-w-4xl'}`}>
                 <div className="bg-white rounded-xl shadow-sm min-h-[500px] flex flex-col p-8 md:p-12 relative animate-fade-in border border-gray-100">
                    <div className="flex gap-6 h-full">
                        {/* Number */}
                        <div className="pt-2 flex flex-col items-center gap-1 text-teal-600">
                           <span className="font-bold text-sm">{fields.findIndex(f => f.id === selectedField.id) + 1}</span>
                           <ArrowRight className="w-4 h-4" />
                        </div>

                        <div className="flex-1 flex flex-col gap-6">
                            {/* Editable Label */}
                            <div className="group relative">
                              <textarea
                                value={selectedField.label}
                                onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                                className="w-full bg-transparent text-2xl md:text-3xl font-light text-gray-900 resize-none outline-none placeholder-gray-300 focus:placeholder-gray-400"
                                placeholder="Type your question here..."
                                rows={Math.max(1, Math.ceil(selectedField.label.length / 30))}
                                style={{ minHeight: '3rem' }}
                              />
                            </div>

                            {/* Description */}
                            <input 
                              type="text" 
                              value={selectedField.description}
                              onChange={(e) => updateField(selectedField.id, { description: e.target.value })}
                              className="w-full bg-transparent text-lg text-gray-500 outline-none placeholder-gray-300 font-light italic"
                              placeholder="Description (optional)"
                            />

                            {/* Dynamic Input Preview */}
                            <div className="py-4">
                                {renderFieldInputPreview(selectedField)}
                            </div>

                            {/* Submit Button Preview */}
                            <div className="mt-4">
                               <button className="px-6 py-2 bg-teal-700 text-white rounded text-lg font-bold hover:bg-teal-800 transition flex items-center gap-2">
                                 OK <Check className="w-4 h-4" />
                               </button>
                               <span className="text-xs text-gray-400 ml-2 mt-1 block">press Enter ↵</span>
                            </div>
                        </div>
                    </div>
                 </div>
               </div>
             ) : (
               <div className="text-center text-gray-400">
                 <p>Select a question to edit</p>
               </div>
             )}
          </div>
        </main>

        {/* 4. RIGHT SIDEBAR (PROPERTIES & LOGIC) */}
        <aside className="w-80 bg-white border-l flex flex-col z-20">
          <div className="flex border-b">
             <button onClick={() => setRightSidebarTab('question')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition ${rightSidebarTab === 'question' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>Question</button>
             <button onClick={() => setRightSidebarTab('design')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition ${rightSidebarTab === 'design' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>Design</button>
             <button onClick={() => setRightSidebarTab('logic')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition ${rightSidebarTab === 'logic' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>Logic</button>
          </div>

          {selectedField && rightSidebarTab === 'question' && (
            <div className="flex-1 overflow-y-auto p-5 space-y-8">
               {/* Type Display */}
               <div>
                 <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Type</label>
                 <button className="w-full flex items-center justify-between p-3 border rounded-lg bg-gray-50 text-gray-700">
                    <div className="flex items-center gap-3">
                      {getFieldIcon(selectedField.type)}
                      <span className="text-sm font-medium capitalize">{selectedField.type.replace('_', ' ')}</span>
                    </div>
                 </button>
               </div>

               {/* General Settings */}
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Settings</label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-sm text-gray-700 font-medium">Required</span>
                       <button onClick={() => updateField(selectedField.id, { required: !selectedField.required })} className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${selectedField.required ? 'bg-black' : 'bg-gray-200'}`}>
                         <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${selectedField.required ? 'translate-x-6' : 'translate-x-0'}`}></div>
                       </button>
                    </div>
                  </div>
               </div>

               {/* Options Editor for Choice Fields */}
               {['multiple_choice', 'dropdown'].includes(selectedField.type) && (
                   <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Options</label>
                       <div className="space-y-2">
                           {selectedField.options?.map((opt, idx) => (
                               <div key={idx} className="flex gap-2">
                                   <input 
                                       value={opt}
                                       onChange={(e) => {
                                           const newOpts = [...(selectedField.options || [])];
                                           newOpts[idx] = e.target.value;
                                           updateField(selectedField.id, { options: newOpts });
                                       }}
                                       className="flex-1 p-2 border rounded text-sm focus:border-black outline-none" 
                                   />
                                   <button 
                                       onClick={() => {
                                           const newOpts = selectedField.options?.filter((_, i) => i !== idx);
                                           updateField(selectedField.id, { options: newOpts });
                                       }}
                                       className="text-gray-400 hover:text-red-500"
                                   >
                                       <Trash2 className="w-4 h-4" />
                                   </button>
                               </div>
                           ))}
                           <button 
                               onClick={() => updateField(selectedField.id, { options: [...(selectedField.options || []), `Option ${(selectedField.options?.length || 0) + 1}`] })}
                               className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1 mt-2"
                           >
                               <Plus className="w-3 h-3" /> Add option
                           </button>
                       </div>
                   </div>
               )}
            </div>
          )}

          {selectedField && rightSidebarTab === 'design' && (
             <div className="flex-1 overflow-y-auto p-5">
                <h3 className="font-bold text-gray-900 mb-4">Themes</h3>
                <div className="grid grid-cols-2 gap-3">
                    {THEMES.map(theme => (
                        <div 
                            key={theme.id}
                            onClick={() => setSelectedTheme(theme)}
                            className={`cursor-pointer border-2 rounded-lg p-2 space-y-2 hover:border-gray-400 transition ${selectedTheme.id === theme.id ? 'border-black ring-1 ring-black' : 'border-gray-100'}`}
                        >
                             <div className={`h-12 rounded ${theme.bg} border relative overflow-hidden`}>
                                <div className={`absolute top-2 left-2 w-6 h-1.5 rounded-full ${theme.btn} opacity-40`}></div>
                             </div>
                             <div className="text-xs font-medium text-center text-gray-600">{theme.name}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 p-4 bg-gray-50 rounded text-center text-xs text-gray-500">
                    Design changes apply globally to your form.
                </div>
             </div>
          )}

          {selectedField && rightSidebarTab === 'logic' && (
            <div className="flex-1 overflow-y-auto bg-gray-50">
               <div className="p-5 border-b bg-white">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <GitBranch className="w-4 h-4" /> Simple Branching
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Direct respondents to specific questions based on their answer.</p>
               </div>
               
               <div className="p-5 space-y-4">
                  {(selectedField.logic || []).map((rule, idx) => (
                      <div key={idx} className="bg-white p-3 rounded border shadow-sm text-sm relative group">
                          <button 
                            onClick={() => {
                                const newLogic = selectedField.logic?.filter((_, i) => i !== idx);
                                updateField(selectedField.id, { logic: newLogic });
                            }}
                            className="absolute top-2 right-2 text-gray-300 hover:text-red-500"
                          >
                              <X className="w-3 h-3" />
                          </button>
                          <div className="font-medium text-gray-500 mb-1">If answer is <span className="text-black font-bold">"{rule.condition}"</span></div>
                          <div className="font-medium text-gray-500">Jump to <span className="text-blue-600 font-bold">Q{fields.findIndex(f => f.id === rule.jumpTo) + 1}</span></div>
                      </div>
                  ))}

                  <div className="bg-white p-4 rounded border shadow-sm">
                     <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold text-gray-500 uppercase">If answer is</span>
                     </div>
                     <select id="logic-condition" className="w-full p-2 border rounded text-sm bg-gray-50 mb-4 outline-none focus:border-black transition">
                        {selectedField.options ? (
                           selectedField.options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)
                        ) : (
                           <option value="Any">Any value</option>
                        )}
                     </select>

                     <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold text-gray-500 uppercase">Then jump to</span>
                     </div>
                     <select id="logic-jump" className="w-full p-2 border rounded text-sm bg-gray-50 outline-none focus:border-black transition">
                        {fields.filter(f => f.id !== selectedField.id).map(f => (
                           <option key={f.id} value={f.id}>{f.label}</option>
                        ))}
                     </select>

                     <button 
                        onClick={() => {
                            const condition = (document.getElementById('logic-condition') as HTMLSelectElement).value;
                            const jumpTo = (document.getElementById('logic-jump') as HTMLSelectElement).value;
                            if (condition && jumpTo) {
                                updateField(selectedField.id, { 
                                    logic: [...(selectedField.logic || []), { id: Date.now().toString(), condition, jumpTo }] 
                                });
                            }
                        }}
                        className="w-full mt-4 py-2 bg-black text-white rounded text-sm font-medium hover:bg-gray-800 transition"
                     >
                        Add Rule
                     </button>
                  </div>
               </div>
            </div>
          )}
        </aside>
    </div>
  );

  const renderWorkflowTab = () => (
    <div className="flex-1 bg-gray-50 flex overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="flex-1 flex flex-col items-center justify-start pt-20 overflow-auto">
         {/* Dynamic Flowchart */}
         <div className="flex flex-col items-center">
             <div className="bg-black text-white px-6 py-3 rounded-lg shadow-lg mb-8 font-bold text-sm">Start</div>
             
             {fields.map((field, idx) => (
                 <React.Fragment key={field.id}>
                     <div className="w-px h-8 bg-gray-300"></div>
                     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-72 text-center relative group hover:border-blue-500 transition">
                         <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                             {idx + 1}
                         </div>
                         <div className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{field.type.replace('_', ' ')}</div>
                         <div className="font-medium truncate text-sm">{field.label}</div>
                         
                         {/* Logic Branches Visualization */}
                         {field.logic && field.logic.length > 0 && (
                             <div className="absolute top-1/2 right-0 translate-x-full ml-4 flex flex-col gap-2">
                                 {field.logic.map(l => (
                                     <div key={l.id} className="flex items-center gap-2 text-xs whitespace-nowrap">
                                         <div className="w-8 h-px bg-blue-400"></div>
                                         <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
                                            If "{l.condition}" → Q{fields.findIndex(f => f.id === l.jumpTo) + 1}
                                         </span>
                                     </div>
                                 ))}
                             </div>
                         )}
                     </div>
                 </React.Fragment>
             ))}

             <div className="w-px h-8 bg-gray-300"></div>
             <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg font-bold text-sm">End Screen</div>
         </div>
      </div>
    </div>
  );

  const renderDesignTab = () => (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-80 bg-white border-r flex flex-col z-20">
         <div className="p-6 border-b">
           <h2 className="text-lg font-bold">Design</h2>
           <p className="text-gray-500 text-sm">Customize the look and feel.</p>
         </div>
         <div className="p-6 grid grid-cols-2 gap-4">
            {THEMES.map(theme => (
              <div 
                key={theme.id}
                onClick={() => setSelectedTheme(theme)}
                className={`cursor-pointer border-2 rounded-lg p-2 space-y-2 hover:border-gray-400 transition ${selectedTheme.id === theme.id ? 'border-black ring-1 ring-black' : 'border-gray-100'}`}
              >
                 <div className={`h-16 rounded ${theme.bg} border relative overflow-hidden`}>
                    <div className={`absolute top-2 left-2 w-8 h-2 rounded-full ${theme.btn} opacity-40`}></div>
                 </div>
                 <div className="text-xs font-medium text-center">{theme.name}</div>
              </div>
            ))}
         </div>
      </aside>
      <main className={`flex-1 flex items-center justify-center p-12 transition-colors duration-500 ${selectedTheme.bg}`}>
         <div className="w-full max-w-xl animate-fade-in">
             <div className="mb-8">
                <span className={`text-sm font-bold opacity-50 ${selectedTheme.text} ${selectedTheme.accent}`}>1 <ArrowRight className="inline w-3 h-3"/></span>
                <h1 className={`text-3xl md:text-4xl font-light mt-2 ${selectedTheme.text}`}>
                  {fields[0]?.label || 'Preview Question'}
                </h1>
                <p className={`mt-4 text-xl opacity-60 font-light ${selectedTheme.text}`}>{fields[0]?.description || 'Description goes here...'}</p>
             </div>
             
             <div className="my-8">
                {renderFieldInputPreview(fields[0], selectedTheme)}
             </div>

             <button className={`px-6 py-2 rounded font-bold text-lg transition shadow-sm ${selectedTheme.btn}`}>
               OK <span className="text-xs font-normal opacity-70 ml-1">press Enter ↵</span>
             </button>
         </div>
      </main>
    </div>
  );

  const renderShareTab = () => (
    <div className="flex-1 bg-white flex flex-col items-center pt-16 px-4">
       <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <LinkIcon className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Your form is ready to share!</h1>
          <p className="text-gray-500 mt-2">Start collecting responses by sharing the link below.</p>
       </div>

       <div className="w-full max-w-2xl bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Public Link</label>
          <div className="flex gap-2">
             <div className="flex-1 bg-white border rounded px-4 py-3 text-gray-600 font-mono text-sm truncate select-all">
                https://form.typeform.com/to/xq9sK
             </div>
             <button onClick={copyLink} className="bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-800 transition flex items-center gap-2">
                <Copy className="w-4 h-4" /> Copy
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
          <button className="p-4 border rounded-lg hover:border-black transition text-left group">
             <Code className="w-6 h-6 text-gray-400 group-hover:text-black mb-2" />
             <div className="font-bold">Embed</div>
             <div className="text-xs text-gray-500">Add to your website</div>
          </button>
          <button className="p-4 border rounded-lg hover:border-black transition text-left group">
             <Mail className="w-6 h-6 text-gray-400 group-hover:text-black mb-2" />
             <div className="font-bold">Email</div>
             <div className="text-xs text-gray-500">Send via email campaign</div>
          </button>
          <button className="p-4 border rounded-lg hover:border-black transition text-left group">
             <Share2 className="w-6 h-6 text-gray-400 group-hover:text-black mb-2" />
             <div className="font-bold">Social</div>
             <div className="text-xs text-gray-500">Share on social media</div>
          </button>
       </div>
    </div>
  );

  const renderResultsTab = () => (
    <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
       <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
             <h1 className="text-2xl font-bold text-gray-900">Summary</h1>
             <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded hover:bg-gray-50 text-sm font-medium">
                <Download className="w-4 h-4" /> Export results
             </button>
          </div>

          {/* Big Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                   <div className="text-sm font-medium text-gray-500">Views</div>
                   <Eye className="w-5 h-5 text-gray-300" />
                </div>
                <div className="text-3xl font-bold text-gray-900">1,248</div>
                <div className="text-xs text-green-600 mt-2 flex items-center gap-1">
                   <span className="font-bold">↑ 12%</span> from last week
                </div>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                   <div className="text-sm font-medium text-gray-500">Starts</div>
                   <div className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">68% rate</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">854</div>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                   <div className="text-sm font-medium text-gray-500">Responses</div>
                   <div className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">42% rate</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">358</div>
             </div>
          </div>

          {/* Device Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6">Device Breakdown</h3>
                <div className="flex items-center gap-8">
                   <div className="relative w-32 h-32">
                       <PieChart className="w-full h-full text-blue-500" />
                   </div>
                   <div className="space-y-3">
                      <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                         <span className="text-sm text-gray-600">Desktop (65%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                         <span className="text-sm text-gray-600">Mobile (35%)</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6">Drop-off Analysis</h3>
                <div className="space-y-4">
                   {fields.map((f, i) => (
                      <div key={f.id} className="relative">
                         <div className="flex justify-between text-sm mb-1">
                            <span>{i + 1}. {f.label}</span>
                            <span className="font-mono text-gray-500">{Math.max(10, 100 - (i * 15))}%</span>
                         </div>
                         <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gray-900 rounded-full transition-all duration-1000" 
                              style={{ width: `${Math.max(10, 100 - (i * 15))}%` }}
                            ></div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="h-14 bg-white border-b flex items-center justify-between px-4 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500 hover:text-black cursor-pointer">
             <div className="w-8 h-8 bg-gray-900 text-white rounded flex items-center justify-center font-bold text-lg">T</div>
          </div>
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <button 
               onClick={() => setActiveTab('content')}
               className={`transition py-4 border-b-2 ${activeTab === 'content' ? 'text-black border-black' : 'text-gray-500 border-transparent hover:text-black'}`}
            >
               Content
            </button>
            <button 
               onClick={() => setActiveTab('workflow')}
               className={`transition py-4 border-b-2 ${activeTab === 'workflow' ? 'text-black border-black' : 'text-gray-500 border-transparent hover:text-black'}`}
            >
               Workflow
            </button>
            <button 
               onClick={() => setActiveTab('design')}
               className={`transition py-4 border-b-2 ${activeTab === 'design' ? 'text-black border-black' : 'text-gray-500 border-transparent hover:text-black'}`}
            >
               Design
            </button>
            <button 
               onClick={() => setActiveTab('share')}
               className={`transition py-4 border-b-2 ${activeTab === 'share' ? 'text-black border-black' : 'text-gray-500 border-transparent hover:text-black'}`}
            >
               Share
            </button>
            <button 
               onClick={() => setActiveTab('results')}
               className={`transition py-4 border-b-2 ${activeTab === 'results' ? 'text-black border-black' : 'text-gray-500 border-transparent hover:text-black'}`}
            >
               Results
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Eye className="w-5 h-5" />
          </button>
          <button className="bg-black text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-800 transition">
            Publish
          </button>
          <div className="w-8 h-8 bg-purple-600 rounded-full text-white flex items-center justify-center text-xs font-bold">
            US
          </div>
        </div>
      </header>

      {/* MAIN WORKSPACE RENDERER */}
      {activeTab === 'content' && renderContentTab()}
      {activeTab === 'workflow' && renderWorkflowTab()}
      {activeTab === 'design' && renderDesignTab()}
      {activeTab === 'share' && renderShareTab()}
      {activeTab === 'results' && renderResultsTab()}

    </div>
  );
}

function MonitorIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> }
function TabletIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> }
function SmartphoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> }