import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowUp,
  FileText,
  Shield,
  Scale,
  AlertCircle,
  Check
} from 'lucide-react';
import Navbar from '@/ui/layouts/Navbar';
import Footer from '@/ui/layouts/Footer';

const sections = [
  { id: 'introduction', title: '1. Introduction', icon: FileText },
  { id: 'usage', title: '2. Acceptable Use', icon: Check },
  { id: 'liability', title: '3. Limitation of Liability', icon: AlertCircle },
  { id: 'intellectual', title: '4. Intellectual Property', icon: Shield },
  { id: 'disputes', title: '5. Dispute Resolution', icon: Scale },
];

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

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
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-6 border border-stone-200 bg-white rounded-full text-xs font-mono uppercase tracking-widest text-stone-500">
              Legal
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-stone-900 mb-6 tracking-tight">
              The Fine Print.
            </h1>
            <p className="text-xl text-stone-600 mb-8 max-w-xl mx-auto leading-relaxed font-light">
              We know, we know. Nobody likes reading these. But it's important stuff about how we work together.
            </p>
            
            {/* Last Updated Stamp */}
            <div className="inline-flex items-center gap-2 font-mono text-sm text-stone-400 border border-dashed border-stone-300 px-4 py-2 rounded transform rotate-1">
              <span>LAST UPDATED:</span>
              <span className="text-stone-900 font-bold">OCTOBER 12, 2024</span>
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-1">
              <h3 className="font-serif font-bold text-stone-900 mb-4 px-3 text-lg">Table of Contents</h3>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors flex items-center justify-between group rounded
                    ${activeSection === section.id 
                      ? 'bg-stone-900 text-white shadow-md' 
                      : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'}
                  `}
                >
                  <span className="truncate">{section.title}</span>
                  {activeSection === section.id && <ArrowRight size={14} />}
                </button>
              ))}
              
              <div className="mt-8 p-6 bg-orange-50 border border-orange-100 rounded-lg">
                <p className="text-xs font-bold text-orange-800 uppercase tracking-wide mb-2">Need Help?</p>
                <p className="text-sm text-stone-600 mb-3">Questions about our terms? Our legal team is happy to clarify.</p>
                <a href="#" className="text-sm font-bold text-stone-900 underline decoration-1 hover:text-orange-600">Contact Support</a>
              </div>
            </div>
          </aside>

          {/* Document Content */}
          <main className="lg:col-span-8 lg:col-start-5">
            <div className="bg-white border border-stone-200 p-8 md:p-16 shadow-[8px_8px_0px_0px_rgba(28,25,23,0.1)] relative">
              
              {/* Decorative Paper Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-stone-100"></div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-stone-100 via-transparent to-transparent"></div>

              {/* Section 1: Introduction */}
              <div id="introduction" className="mb-16 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                  <div className="w-8 h-8 bg-stone-100 rounded flex items-center justify-center text-stone-600">
                    <FileText size={18} />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900">1. Introduction</h2>
                </div>
                <div className="prose prose-stone max-w-none text-stone-600">
                  <p className="mb-4">
                    Welcome to PaperFill. By accessing or using our website, services, applications, and tools (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, do not use our Services.
                  </p>
                  <p>
                    These Terms apply to all visitors, users, and others who wish to access or use the Service. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
                  </p>
                </div>
              </div>

              {/* Section 2: Acceptable Use */}
              <div id="usage" className="mb-16 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                  <div className="w-8 h-8 bg-stone-100 rounded flex items-center justify-center text-stone-600">
                    <Check size={18} />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900">2. Acceptable Use</h2>
                </div>
                <div className="prose prose-stone max-w-none text-stone-600">
                  <p className="mb-4">
                    You agree not to misuse the Services. For example, you must not, and must not attempt to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 marker:text-stone-400">
                    <li>Probe, scan, or test the vulnerability of any system or network.</li>
                    <li>Breach or otherwise circumvent any security or authentication measures.</li>
                    <li>Access, tamper with, or use non-public areas or parts of the Services, or shared areas of the Services you haven't been invited to.</li>
                    <li>Interfere with or disrupt any user, host, or network, for example by sending a virus, overloading, flooding, spamming, or mail-bombing any part of the Services.</li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Liability */}
              <div id="liability" className="mb-16 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                  <div className="w-8 h-8 bg-stone-100 rounded flex items-center justify-center text-stone-600">
                    <AlertCircle size={18} />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900">3. Limitation of Liability</h2>
                </div>
                <div className="prose prose-stone max-w-none text-stone-600">
                  <p className="mb-4 p-4 bg-stone-50 border-l-2 border-stone-900 italic text-stone-700">
                    To the maximum extent permitted by law, PaperFill shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues.
                  </p>
                  <p>
                    In no event shall the aggregate liability of PaperFill exceed the greater of one hundred U.S. dollars (U.S. $100.00) or the amount you paid PaperFill, if any, in the past six months for the services giving rise to the claim.
                  </p>
                </div>
              </div>

              {/* Section 4: IP */}
              <div id="intellectual" className="mb-16 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                  <div className="w-8 h-8 bg-stone-100 rounded flex items-center justify-center text-stone-600">
                    <Shield size={18} />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900">4. Intellectual Property</h2>
                </div>
                <div className="prose prose-stone max-w-none text-stone-600">
                  <p>
                    The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of PaperFill and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of PaperFill.
                  </p>
                </div>
              </div>

              {/* Section 5: Disputes */}
              <div id="disputes" className="mb-8 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                  <div className="w-8 h-8 bg-stone-100 rounded flex items-center justify-center text-stone-600">
                    <Scale size={18} />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900">5. Dispute Resolution</h2>
                </div>
                <div className="prose prose-stone max-w-none text-stone-600">
                  <p>
                    For any dispute you have with PaperFill, you agree to first contact us and attempt to resolve the dispute informally. If we have not been able to resolve the dispute with you informally, we each agree to resolve any claim, dispute, or controversy (excluding claims for injunctive or other equitable relief) arising out of or in connection with or relating to these Terms by binding arbitration.
                  </p>
                </div>
              </div>

              {/* End of Document Signoff */}
              <div className="mt-16 pt-8 border-t border-stone-200 text-center">
                 <div className="inline-block w-24 h-24 border-4 border-stone-200 rounded-full flex items-center justify-center opacity-50 mb-4 rotate-12">
                    <span className="font-mono text-xs font-bold text-stone-400 uppercase">End of<br/>Document</span>
                 </div>
                 <p className="text-stone-400 text-sm font-serif italic">Thank you for being part of PaperFill.</p>
              </div>

            </div>
          </main>
        </div>

        {/* Back to Top Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-stone-900 text-white flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors z-50 md:hidden"
        >
          <ArrowUp size={20} />
        </button>

        <Footer />
      </div>
    </div>
  );
};

export default TermsPage;