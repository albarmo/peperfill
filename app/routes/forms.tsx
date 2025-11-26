import React, { useState, ReactNode } from 'react';
import { 
  Search, 
  Plus, 
  Layout, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  Star,
  ArrowRight,
  CheckCircle2,
  MoreHorizontal,
  Users,
  Calendar,
  ChevronDown,
  LayoutGrid,
  List as ListIcon,
  HelpCircle,
  Puzzle,
  Briefcase as BrandKitIcon,
  Zap,
  Contact as ContactIcon,
  Workflow,
  Download,
  Filter,
  Loader2,
  Mail,
  Bell,
  Trash2,
  Settings,
  Type,
  AlignLeft,
  Hash,
  ListChecks,
  CalendarDays,
  GripVertical,
  ChevronLeft,
  Eye,
  Save
} from 'lucide-react';

// --- Interfaces & Types ---

interface Template {
  id: number;
  title: string;
  category: string;
  description: string;
  uses: string;
  color: string;
  icon: ReactNode;
}

interface Project {
  id: number;
  title: string;
  responses: number;
  completionRate: string | null;
  updated: string;
  hasIntegration: boolean;
  type: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  initial: string;
  color: string;
  date: string;
  source: string;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  color: string;
}

interface ActiveAutomation extends Integration {
  active: boolean;
  dateAdded: string;
}

interface FormField {
  id: string;
  type: 'text' | 'long_text' | 'email' | 'number' | 'multiple_choice' | 'date';
  label: string;
  description?: string;
  required: boolean;
  options?: string[]; // For multiple choice
}

type ViewState = 'landing' | 'dashboard' | 'builder';
type TabState = 'forms' | 'contacts' | 'automations';
type ViewMode = 'list' | 'grid';

// --- Data Dummy Dashboard ---
const MY_PROJECTS: Project[] = [
  {
    id: 101,
    title: "New typeform",
    responses: 0,
    completionRate: null,
    updated: "26 Nov 2025",
    hasIntegration: true,
    type: "form"
  },
  {
    id: 102,
    title: "Customer Feedback 2025",
    responses: 124,
    completionRate: "45%",
    updated: "25 Nov 2025",
    hasIntegration: false,
    type: "form"
  },
  {
    id: 103,
    title: "Event Registration",
    responses: 89,
    completionRate: "72%",
    updated: "20 Nov 2025",
    hasIntegration: true,
    type: "form"
  }
];

// --- Data Dummy Kontak ---
const DUMMY_CONTACTS: Contact[] = [
  { id: 1, name: "Budi Santoso", email: "budi.s@example.com", initial: "BS", color: "bg-blue-100 text-blue-600", date: "26 Nov 2025", source: "Customer Feedback" },
  { id: 2, name: "Siti Aminah", email: "siti.aminah@test.com", initial: "SA", color: "bg-pink-100 text-pink-600", date: "25 Nov 2025", source: "Event Registration" },
  { id: 3, name: "Andi Wijaya", email: "andi.w@company.co.id", initial: "AW", color: "bg-green-100 text-green-600", date: "24 Nov 2025", source: "Customer Feedback" },
  { id: 4, name: "Rina Kusuma", email: "rina.k@gmail.com", initial: "RK", color: "bg-purple-100 text-purple-600", date: "22 Nov 2025", source: "Job Application" },
  { id: 5, name: "Dedi Pratama", email: "dedi.p@yahoo.com", initial: "DP", color: "bg-yellow-100 text-yellow-600", date: "20 Nov 2025", source: "Website Contact" },
];

// --- Data Dummy Integrasi Automations ---
const AVAILABLE_INTEGRATIONS: Integration[] = [
  { id: 'sheets', name: 'Google Sheets', description: 'Send new responses to a spreadsheet row.', icon: <FileText className="w-6 h-6 text-green-600" />, color: 'bg-green-50' },
  { id: 'slack', name: 'Slack', description: 'Notify a channel when you get a response.', icon: <MessageSquare className="w-6 h-6 text-purple-600" />, color: 'bg-purple-50' },
  { id: 'mailchimp', name: 'Mailchimp', description: 'Add respondents to your newsletter list.', icon: <Mail className="w-6 h-6 text-yellow-600" />, color: 'bg-yellow-50' },
  { id: 'notion', name: 'Notion', description: 'Create a database item for each response.', icon: <Layout className="w-6 h-6 text-gray-800" />, color: 'bg-gray-100' },
  { id: 'zapier', name: 'Zapier', description: 'Connect with 5,000+ other apps easily.', icon: <Zap className="w-6 h-6 text-orange-600" />, color: 'bg-orange-50' },
  { id: 'email', name: 'Email Notification', description: 'Get an email for every new submission.', icon: <Bell className="w-6 h-6 text-blue-600" />, color: 'bg-blue-50' },
];

// --- Helper untuk Form Builder ---
const FIELD_TYPES = [
  { type: 'text', label: 'Short Text', icon: <Type className="w-4 h-4" /> },
  { type: 'long_text', label: 'Long Text', icon: <AlignLeft className="w-4 h-4" /> },
  { type: 'multiple_choice', label: 'Multiple Choice', icon: <ListChecks className="w-4 h-4" /> },
  { type: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
  { type: 'number', label: 'Number', icon: <Hash className="w-4 h-4" /> },
  { type: 'date', label: 'Date', icon: <CalendarDays className="w-4 h-4" /> },
];

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("dashboard"); 

  // --- Komponen: Form Builder Page ---
  const FormBuilderPage: React.FC = () => {
    const [fields, setFields] = useState<FormField[]>([
      { id: '1', type: 'text', label: 'Siapa nama Anda?', required: true },
      { id: '2', type: 'email', label: 'Email untuk menghubungi Anda?', required: true }
    ]);
    const [selectedFieldId, setSelectedFieldId] = useState<string | null>('1');

    const addField = (type: FormField['type']) => {
      const newField: FormField = {
        id: Date.now().toString(),
        type,
        label: `Pertanyaan ${type === 'multiple_choice' ? 'Pilihan' : 'Baru'}`,
        required: false,
        options: type === 'multiple_choice' ? ['Opsi 1', 'Opsi 2'] : undefined
      };
      setFields([...fields, newField]);
      setSelectedFieldId(newField.id);
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
      setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    const deleteField = (id: string) => {
      setFields(fields.filter(f => f.id !== id));
      if (selectedFieldId === id) setSelectedFieldId(null);
    };

    const selectedField = fields.find(f => f.id === selectedFieldId);

    return (
      <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-900">
        {/* Builder Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('dashboard')} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <input 
                type="text" 
                defaultValue="My New Form" 
                className="font-bold text-gray-900 focus:outline-none focus:border-b-2 focus:border-black bg-transparent"
              />
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Saved automatically
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                <Eye className="w-4 h-4" /> Preview
             </button>
             <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800">
                Publish
             </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar: Tools */}
          <aside className="w-64 bg-white border-r flex flex-col z-10">
            <div className="p-4 border-b">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Add Field</h3>
              <div className="grid grid-cols-1 gap-2">
                {FIELD_TYPES.map((ft) => (
                  <button 
                    key={ft.type}
                    onClick={() => addField(ft.type as any)}
                    className="flex items-center gap-3 p-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all text-left group"
                  >
                    <div className="bg-white p-1.5 rounded border border-gray-200 text-gray-500 group-hover:text-black">
                      {ft.icon}
                    </div>
                    {ft.label}
                    <Plus className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Structure</h3>
               <div className="space-y-1">
                 {fields.map((field, index) => (
                   <div 
                      key={field.id}
                      onClick={() => setSelectedFieldId(field.id)}
                      className={`flex items-center gap-2 p-2 rounded-md text-sm cursor-pointer transition ${selectedFieldId === field.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                   >
                      <div className="text-xs text-gray-400 w-4">{index + 1}</div>
                      <div className="truncate flex-1">{field.label}</div>
                   </div>
                 ))}
               </div>
            </div>
          </aside>

          {/* Center Canvas: Preview */}
          <main className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm min-h-[500px] p-8 space-y-6">
               <div className="text-center mb-8 border-b pb-4">
                  <h1 className="text-3xl font-bold text-gray-900">Formulir Pendaftaran</h1>
                  <p className="text-gray-500 mt-2">Silakan isi data diri Anda di bawah ini.</p>
               </div>

               {fields.length === 0 ? (
                 <div className="text-center py-20 text-gray-400 border-2 border-dashed rounded-lg">
                    <p>Formulir Anda kosong.</p>
                    <p className="text-sm">Tambahkan pertanyaan dari panel kiri.</p>
                 </div>
               ) : (
                 fields.map((field) => (
                   <div 
                      key={field.id}
                      onClick={() => setSelectedFieldId(field.id)}
                      className={`group relative p-6 rounded-lg border-2 transition-all cursor-pointer ${selectedFieldId === field.id ? 'border-blue-500 bg-blue-50/20 shadow-sm' : 'border-transparent hover:bg-gray-50'}`}
                   >
                      <div className="mb-2">
                        <label className="block text-lg font-medium text-gray-900">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {field.description && <p className="text-sm text-gray-500 mt-1">{field.description}</p>}
                      </div>

                      {/* Render Input Mockups */}
                      <div className="pointer-events-none">
                        {field.type === 'text' && (
                          <input type="text" placeholder="Jawaban singkat..." className="w-full border-b border-gray-300 py-2 bg-transparent text-gray-500" disabled />
                        )}
                        {field.type === 'long_text' && (
                          <textarea placeholder="Jawaban panjang..." className="w-full border border-gray-300 rounded p-2 bg-white text-gray-500 h-24 resize-none" disabled />
                        )}
                        {field.type === 'email' && (
                          <input type="email" placeholder="name@example.com" className="w-full border-b border-gray-300 py-2 bg-transparent text-gray-500" disabled />
                        )}
                        {field.type === 'number' && (
                          <input type="number" placeholder="0" className="w-full border-b border-gray-300 py-2 bg-transparent text-gray-500" disabled />
                        )}
                        {field.type === 'date' && (
                          <input type="date" className="w-full border-b border-gray-300 py-2 bg-transparent text-gray-500" disabled />
                        )}
                        {field.type === 'multiple_choice' && (
                          <div className="space-y-2">
                            {field.options?.map((opt, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 border rounded bg-white text-gray-600">
                                <div className="w-4 h-4 border rounded-full"></div>
                                <span>{opt}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons on Hover/Select */}
                      <div className={`absolute top-2 right-2 flex gap-2 ${selectedFieldId === field.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                         <button onClick={(e) => { e.stopPropagation(); deleteField(field.id); }} className="p-1.5 bg-white text-red-500 rounded border hover:bg-red-50 shadow-sm">
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                 ))
               )}
            </div>
          </main>

          {/* Right Sidebar: Properties */}
          <aside className="w-80 bg-white border-l flex flex-col z-10">
            {selectedField ? (
              <>
                <div className="p-4 border-b flex items-center gap-2 bg-gray-50">
                   <div className="p-1.5 bg-white border rounded shadow-sm">
                      <Settings className="w-4 h-4 text-gray-500" />
                   </div>
                   <h3 className="font-semibold text-gray-700">Question Settings</h3>
                </div>
                
                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                   {/* Label */}
                   <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Question Text</label>
                     <input 
                       type="text" 
                       value={selectedField.label}
                       onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                     />
                   </div>

                   {/* Description */}
                   <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                     <textarea 
                       value={selectedField.description || ''}
                       onChange={(e) => updateField(selectedField.id, { description: e.target.value })}
                       rows={3}
                       placeholder="Add context or instructions..."
                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition resize-none"
                     />
                   </div>

                   {/* Options (Only for Multiple Choice) */}
                   {selectedField.type === 'multiple_choice' && (
                     <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Options</label>
                       <div className="space-y-2 mb-2">
                         {selectedField.options?.map((opt, idx) => (
                           <div key={idx} className="flex gap-2">
                              <input 
                                type="text"
                                value={opt}
                                onChange={(e) => {
                                  const newOpts = [...(selectedField.options || [])];
                                  newOpts[idx] = e.target.value;
                                  updateField(selectedField.id, { options: newOpts });
                                }}
                                className="flex-1 p-2 border border-gray-300 rounded text-sm"
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
                       </div>
                       <button 
                         onClick={() => {
                           const newOpts = [...(selectedField.options || []), `Option ${(selectedField.options?.length || 0) + 1}`];
                           updateField(selectedField.id, { options: newOpts });
                         }}
                         className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                       >
                         <Plus className="w-3 h-3" /> Add Option
                       </button>
                     </div>
                   )}

                   {/* Switches */}
                   <div className="pt-4 border-t">
                     <div className="flex items-center justify-between">
                       <span className="text-sm font-medium text-gray-700">Required</span>
                       <button 
                          onClick={() => updateField(selectedField.id, { required: !selectedField.required })}
                          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${selectedField.required ? 'bg-black' : 'bg-gray-200'}`}
                       >
                          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${selectedField.required ? 'translate-x-5' : 'translate-x-0'}`}></div>
                       </button>
                     </div>
                   </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-400">
                 <Settings className="w-12 h-12 mb-4 opacity-20" />
                 <p>Select a question to edit its properties.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    );
  };

  // --- Komponen: Dashboard Page (Typeform Style) ---
  const DashboardPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const [activeTab, setActiveTab] = useState<TabState>("forms");
    
    // State Contacts
    const [contacts, setContacts] = useState<Contact[]>([]); 
    const [isLoadingContacts, setIsLoadingContacts] = useState<boolean>(false);

    // State Automations
    const [activeAutomations, setActiveAutomations] = useState<ActiveAutomation[]>([]);
    const [isSelectingAutomation, setIsSelectingAutomation] = useState<boolean>(false);
    const [isLoadingAutomation, setIsLoadingAutomation] = useState<string | null>(null); // id of automation being added

    // Fungsi simulasi import kontak
    const handleImportContacts = () => {
      setIsLoadingContacts(true);
      setTimeout(() => {
        setContacts(DUMMY_CONTACTS);
        setIsLoadingContacts(false);
      }, 1500);
    };

    // Fungsi tambah automation
    const handleAddAutomation = (integration: Integration) => {
        setIsLoadingAutomation(integration.id);
        setTimeout(() => {
            setActiveAutomations((prev) => [...prev, { ...integration, active: true, dateAdded: 'Just now' }]);
            setIsLoadingAutomation(null);
            setIsSelectingAutomation(false);
        }, 1000);
    };

    return (
      <div className="flex flex-col h-screen bg-[#fafafa] text-[#262627] font-sans">
        
        {/* --- Top Navigation Bar --- */}
        <header className="bg-white border-b border-gray-200">
            {/* Top Row: User & System Icons */}
            <div className="flex items-center justify-between px-4 h-12">
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        AM
                    </div>
                    <span className="text-sm font-medium text-gray-700 hover:text-black flex items-center gap-1">
                        Albar Moerhamsa <ChevronDown className="w-3 h-3 text-gray-400" />
                    </span>
                </div>
                <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
                    <button className="flex items-center gap-1.5 hover:text-black">
                        <Puzzle className="w-4 h-4" /> Integrations
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-black">
                        <BrandKitIcon className="w-4 h-4" /> Brand kit
                    </button>
                    <button className="hover:text-black">
                        <HelpCircle className="w-5 h-5" />
                    </button>
                    <div className="w-8 h-8 bg-black rounded-full overflow-hidden cursor-pointer">
                         <img src="https://ui-avatars.com/api/?name=Albar+Moerhamsa&background=0D8ABC&color=fff" alt="User" />
                    </div>
                </div>
            </div>

            {/* Bottom Row: Tabs */}
            <div className="px-4 flex items-center gap-6 text-sm">
                <button 
                    onClick={() => setActiveTab("forms")}
                    className={`py-3 border-b-2 transition ${activeTab === 'forms' ? 'border-black text-black font-medium' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                >
                    Forms
                </button>
                <button 
                    onClick={() => setActiveTab("contacts")}
                    className={`py-3 border-b-2 transition ${activeTab === 'contacts' ? 'border-black text-black font-medium' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                >
                    Contacts
                </button>
                <button 
                    onClick={() => setActiveTab("automations")}
                    className={`py-3 border-b-2 transition ${activeTab === 'automations' ? 'border-black text-black font-medium' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                >
                    Automations
                </button>
            </div>
        </header>

        {/* --- Main Layout: Sidebar + Content --- */}
        <div className="flex flex-1 overflow-hidden">
            
            {/* --- Left Sidebar --- */}
            <aside className="w-64 flex flex-col border-r border-gray-200 bg-white py-6 px-4">
                
                {/* Create Button */}
                <button 
                    onClick={() => setCurrentView('builder')}
                    className="w-full bg-[#262627] hover:bg-black text-white font-medium py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition shadow-sm mb-6"
                >
                    <Plus className="w-5 h-5" />
                    Create a new form
                </button>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border-none rounded text-sm text-gray-700 placeholder-gray-400 focus:ring-0 focus:bg-gray-100 transition"
                    />
                </div>

                {/* Workspaces List */}
                <div className="flex-1 overflow-y-auto space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                        <span>Workspaces</span>
                        <button className="hover:bg-gray-100 p-1 rounded"><Plus className="w-3 h-3" /></button>
                    </div>

                    <div className="group">
                        <button className="flex items-center justify-between w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                           <div className="flex items-center gap-2">
                                <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                                <span>Private</span>
                           </div>
                        </button>
                    </div>

                    <div className="group">
                         <button className="flex items-center justify-between w-full px-2 py-2 text-sm text-gray-900 bg-gray-100 rounded-md font-medium">
                           <div className="flex items-center gap-2">
                                <span className="w-4"></span> {/* Indent */}
                                <span>My workspace</span>
                           </div>
                           <span className="text-xs text-gray-400">1</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Stats Widget */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                    <div className="mb-2">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                            <span>Responses collected</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">0 <span className="text-sm text-gray-400 font-normal">/ 10</span></div>
                        <p className="text-xs text-gray-400 mt-1">Resets on Nov 30</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 mb-4">
                        <div className="bg-gray-800 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <button className="text-xs font-medium text-gray-600 border border-gray-300 rounded px-2 py-1 hover:bg-gray-50">
                        Increase response limit
                    </button>
                </div>
            </aside>

            {/* --- Right Main Content --- */}
            <main className="flex-1 overflow-y-auto bg-[#fafafa]">
                
                {/* === CONTENT: FORMS === */}
                {activeTab === 'forms' && (
                    <div className="p-8">
                        {/* Green Notification Banner */}
                        <div className="bg-[#eefcf6] border border-[#c6f0dc] text-[#0c5132] px-4 py-3 rounded-md flex items-center justify-between mb-8 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-1 rounded-full border border-[#c6f0dc]">
                                    <Zap className="w-4 h-4 text-[#00a36d]" fill="currentColor" />
                                </div>
                                <span className="text-sm font-medium">Hey! Just to let you know you can collect 10 responses this month for free.</span>
                            </div>
                            <button className="text-xs font-bold bg-[#044227] text-white px-3 py-1.5 rounded hover:bg-[#03301c] transition">
                                Get more responses
                            </button>
                        </div>

                        {/* Workspace Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-light text-gray-800">My workspace</h1>
                                <button className="p-1 hover:bg-gray-200 rounded text-gray-400">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                                <button className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 px-2 py-1 hover:bg-gray-100 rounded transition">
                                    <Users className="w-4 h-4" /> Invite
                                </button>
                                <div className="w-6 h-6 rounded-full border border-green-600 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-green-100 text-green-700 text-[8px] flex items-center justify-center rounded-sm rotate-45">
                                        <div className="w-1.5 h-1.5 bg-green-600 rotate-45"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 text-sm text-gray-600 bg-white border hover:border-gray-300 px-3 py-1.5 rounded transition">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    Date created
                                    <ChevronDown className="w-3 h-3 text-gray-400" />
                                </button>
                                <div className="bg-gray-100 p-1 rounded flex">
                                    <button 
                                        onClick={() => setViewMode('list')}
                                        className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <ListIcon className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('grid')}
                                        className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* List Header (Only visible in List view) */}
                        {viewMode === 'list' && (
                            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-400 mb-4 px-4">
                                <div className="col-span-6"></div> {/* Name column spacer */}
                                <div className="col-span-2 text-center">Responses</div>
                                <div className="col-span-2 text-center">Completion</div>
                                <div className="col-span-2 text-right pr-12">Updated</div>
                            </div>
                        )}

                        {/* Projects List */}
                        <div className="space-y-2">
                            {MY_PROJECTS.map((project) => (
                                viewMode === 'list' ? (
                                    // LIST ITEM
                                    <div key={project.id} className="group bg-white border border-transparent hover:border-gray-200 hover:shadow-sm rounded-lg p-3 grid grid-cols-12 gap-4 items-center transition duration-200">
                                        <div className="col-span-6 flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center text-white shadow-sm flex-shrink-0">
                                                {/* Typeform's icon style */}
                                                <div className="w-4 h-4 border-2 border-white/40 rounded-sm"></div> 
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{project.title}</span>
                                        </div>
                                        
                                        <div className="col-span-2 text-center text-sm text-gray-500">
                                            {project.responses > 0 ? project.responses : "-"}
                                        </div>
                                        
                                        <div className="col-span-2 text-center text-sm text-gray-500">
                                            {project.completionRate ? project.completionRate : "-"}
                                        </div>
                                        
                                        <div className="col-span-2 flex items-center justify-end gap-4 pr-2">
                                            <span className="text-xs text-gray-400">{project.updated}</span>
                                            {project.hasIntegration && (
                                                <div className="w-6 h-6 bg-gray-50 rounded flex items-center justify-center border border-gray-200" title="Integrations active">
                                                    <LayoutGrid className="w-3 h-3 text-gray-500" />
                                                </div>
                                            )}
                                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded text-gray-500 transition">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // GRID ITEM (Optional view)
                                    <div key={project.id} className="inline-block w-64 bg-white border rounded-xl p-4 mr-4 mb-4 hover:shadow-md transition">
                                        <div className="flex justify-between items-start mb-10">
                                            <div className="w-10 h-10 bg-gray-800 rounded-md"></div>
                                            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5"/></button>
                                        </div>
                                        <h3 className="font-medium text-gray-900 mb-2">{project.title}</h3>
                                        <div className="text-xs text-gray-500 flex justify-between border-t pt-3">
                                            <span>{project.responses || 0} responses</span>
                                            <span>{project.updated}</span>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* === CONTENT: CONTACTS === */}
                {activeTab === 'contacts' && (
                    <div className="h-full flex flex-col">
                        {isLoadingContacts ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                <Loader2 className="w-8 h-8 text-black animate-spin mb-4" />
                                <p className="text-gray-500">Importing contacts...</p>
                            </div>
                        ) : contacts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <ContactIcon className="w-10 h-10 text-gray-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Contacts</h2>
                                <p className="text-gray-500 max-w-md mb-6">
                                    Manage all the people who have interacted with your forms. Sort, filter, and export your audience data here.
                                </p>
                                <button 
                                    onClick={handleImportContacts}
                                    className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-black/20"
                                >
                                    Import Contacts
                                </button>
                            </div>
                        ) : (
                            <div className="p-8 h-full flex flex-col">
                                {/* Contacts Header */}
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-light text-gray-800 flex items-center gap-2">
                                        All contacts 
                                        <span className="bg-gray-100 text-gray-500 text-sm py-0.5 px-2 rounded-full font-normal">{contacts.length}</span>
                                    </h1>
                                    <button 
                                        onClick={() => setContacts([...contacts, { id: Date.now(), name: "New Contact", email: "new@email.com", initial: "NC", color: "bg-gray-200 text-gray-600", date: "Just now", source: "Manual" }])}
                                        className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 flex items-center gap-2 shadow-sm"
                                    >
                                        <Plus className="w-4 h-4" /> Add contact
                                    </button>
                                </div>

                                {/* Toolbar */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                     <div className="relative flex-1 max-w-md">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="text" 
                                            placeholder="Search by name or email" 
                                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                                        />
                                     </div>
                                     <div className="flex gap-2">
                                         <button className="flex items-center gap-2 px-3 py-2 border bg-white border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition">
                                            <Filter className="w-4 h-4" /> Filter
                                         </button>
                                         <button className="flex items-center gap-2 px-3 py-2 border bg-white border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition">
                                            <Download className="w-4 h-4" /> Export
                                         </button>
                                     </div>
                                </div>

                                {/* Contacts Table */}
                                <div className="bg-white border rounded-lg overflow-hidden flex-1 shadow-sm flex flex-col">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                                                <tr>
                                                    <th className="px-6 py-3 w-10"><input type="checkbox" className="rounded text-black focus:ring-black" /></th>
                                                    <th className="px-6 py-3 font-medium">Name</th>
                                                    <th className="px-6 py-3 font-medium">Email</th>
                                                    <th className="px-6 py-3 font-medium">Date Added</th>
                                                    <th className="px-6 py-3 font-medium">Source</th>
                                                    <th className="px-6 py-3 font-medium"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {contacts.map(contact => (
                                                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors group">
                                                        <td className="px-6 py-4"><input type="checkbox" className="rounded text-black focus:ring-black" /></td>
                                                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-full ${contact.color} flex items-center justify-center text-xs font-bold`}>
                                                                {contact.initial}
                                                            </div>
                                                            {contact.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-500">{contact.email}</td>
                                                        <td className="px-6 py-4 text-gray-500">{contact.date}</td>
                                                        <td className="px-6 py-4 text-gray-500">
                                                            <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-200">
                                                                {contact.source}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button className="text-gray-400 hover:text-black p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all">
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Pagination Placeholder */}
                                    <div className="mt-auto border-t p-4 flex justify-between items-center text-xs text-gray-500">
                                        <span>Showing 1 to {contacts.length} of {contacts.length} entries</span>
                                        <div className="flex gap-1">
                                            <button className="px-2 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
                                            <button className="px-2 py-1 border rounded bg-black text-white">1</button>
                                            <button className="px-2 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* === CONTENT: AUTOMATIONS === */}
                {activeTab === 'automations' && (
                    <div className="h-full flex flex-col">
                        {activeAutomations.length === 0 && !isSelectingAutomation ? (
                            // Empty State
                            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <Workflow className="w-10 h-10 text-gray-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Automations</h2>
                                <p className="text-gray-500 max-w-md mb-6">
                                    Connect your forms to the tools you use every day. Set up workflows to save time and data entry.
                                </p>
                                <button 
                                    onClick={() => setIsSelectingAutomation(true)}
                                    className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-black/20"
                                >
                                    Create new automation
                                </button>
                            </div>
                        ) : isSelectingAutomation ? (
                            // Selection View
                            <div className="p-8 h-full overflow-y-auto">
                                <div className="flex items-center gap-4 mb-8">
                                    <button onClick={() => setIsSelectingAutomation(false)} className="text-gray-500 hover:text-black">
                                        <ArrowRight className="w-5 h-5 rotate-180" />
                                    </button>
                                    <h2 className="text-2xl font-bold text-gray-900">Add an Integration</h2>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {AVAILABLE_INTEGRATIONS.map(integration => (
                                        <div key={integration.id} className="bg-white border rounded-xl p-6 flex flex-col hover:shadow-lg transition">
                                            <div className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center mb-4`}>
                                                {integration.icon}
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{integration.name}</h3>
                                            <p className="text-sm text-gray-500 mb-6 flex-1">{integration.description}</p>
                                            <button 
                                                onClick={() => handleAddAutomation(integration)}
                                                disabled={isLoadingAutomation !== null}
                                                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                                            >
                                                {isLoadingAutomation === integration.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" /> 
                                                ) : (
                                                    "Connect"
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // Active List View
                            <div className="p-8 h-full overflow-y-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-light text-gray-800">Active Automations</h1>
                                    <button 
                                        onClick={() => setIsSelectingAutomation(true)}
                                        className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 flex items-center gap-2 shadow-sm"
                                    >
                                        <Plus className="w-4 h-4" /> New Automation
                                    </button>
                                </div>

                                <div className="grid gap-4">
                                    {activeAutomations.map((automation, idx) => (
                                        <div key={`${automation.id}-${idx}`} className="bg-white border rounded-xl p-6 flex items-center justify-between shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 ${automation.color} rounded-lg flex items-center justify-center`}>
                                                    {automation.icon}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{automation.name}</h3>
                                                    <p className="text-sm text-gray-500">Active • Added {automation.dateAdded}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                                                    <CheckCircle2 className="w-4 h-4" /> Connected
                                                </div>
                                                <button className="text-gray-400 hover:text-black">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </button>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty Space for Forms only */}
                {activeTab === 'forms' && <div className="h-20"></div>}

            </main>
        </div>
      </div>
    );
  };

  // --- Main Render ---
  return (
   <DashboardPage />
  );
}