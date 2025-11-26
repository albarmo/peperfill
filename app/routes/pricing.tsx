import { useState } from 'react';
import { 
  X, 
  Check, 
  Minus,
  Shield,
ArrowRight
} from 'lucide-react';
import Navbar from '@/ui/layouts/Navbar';
import Footer from '@/ui/layouts/Footer';


interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone-200">
      <button 
        className="w-full py-6 flex justify-between items-center text-left hover:bg-stone-50 transition-colors px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-serif font-bold text-lg text-stone-900 pr-8">{question}</span>
        <span className={`text-stone-400 transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <X size={20} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-stone-600 leading-relaxed px-4 max-w-2xl font-light">
          {answer}
        </p>
      </div>
    </div>
  );
};

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const tiers: PricingTier[] = [
    {
      name: "Starter",
      price: 0,
      description: "For hobbyists and side projects.",
      features: [
        "100 responses / month",
        "10 questions per form",
        "Basic logic jumps",
        "Standard templates",
        "Email notifications"
      ],
      cta: "Start for free"
    },
    {
      name: "Pro",
      price: billingCycle === 'yearly' ? 29 : 39,
      description: "For creators and small businesses.",
      highlight: true,
      features: [
        "2,500 responses / month",
        "Unlimited questions",
        "Remove PaperFill branding",
        "Custom fonts & CSS",
        "File upload field (2GB)",
        "Webhook integrations"
      ],
      cta: "Get Pro"
    },
    {
      name: "Business",
      price: billingCycle === 'yearly' ? 79 : 99,
      description: "For scaling teams and agencies.",
      features: [
        "10,000 responses / month",
        "5 Team members",
        "Priority support",
        "Custom domain (CNAME)",
        "Google Analytics tracking",
        "SLA Agreement"
      ],
      cta: "Contact Sales"
    }
  ];

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
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-stone-900 mb-6 tracking-tight">
              Simple pricing,<br/>
              <span className="italic text-stone-400">serious value.</span>
            </h1>
            <p className="text-xl text-stone-600 mb-10 max-w-xl mx-auto leading-relaxed font-light">
              Start for free, upgrade when you need more power. No hidden fees, cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm font-bold tracking-wide ${billingCycle === 'monthly' ? 'text-stone-900' : 'text-stone-400'}`}>Monthly</span>
              
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-16 h-8 bg-stone-200 rounded-full relative p-1 transition-colors hover:bg-stone-300 shadow-inner"
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'}`}></div>
              </button>
              
              <span className={`text-sm font-bold tracking-wide ${billingCycle === 'yearly' ? 'text-stone-900' : 'text-stone-400'}`}>Yearly</span>
              
              {/* Discount Badge */}
              <div className="hidden sm:block ml-2 bg-orange-100 text-orange-700 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border border-orange-200 rotate-2">
                Save 20%
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
            {tiers.map((tier) => (
              <div 
                key={tier.name}
                className={`
                  relative bg-white border flex flex-col p-8 transition-all duration-300
                  ${tier.highlight 
                    ? 'border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] z-10 md:-mt-4' 
                    : 'border-stone-200 hover:border-stone-400 shadow-sm hover:shadow-md'}
                `}
              >
                {tier.highlight && (
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-900 text-white px-4 py-1 text-xs font-mono uppercase tracking-widest shadow-md">
                     Most Popular
                   </div>
                )}

                <h3 className="font-serif font-bold text-2xl text-stone-900 mb-2">{tier.name}</h3>
                <p className="text-stone-500 text-sm mb-6 h-10">{tier.description}</p>
                
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-serif text-stone-900">${tier.price}</span>
                  <span className="text-stone-400 text-sm font-mono">/mo</span>
                </div>

                <button className={`
                  w-full py-4 font-bold text-sm transition-all mb-8 flex items-center justify-center gap-2 group
                  ${tier.highlight
                    ? 'bg-stone-900 text-white hover:bg-orange-600'
                    : 'bg-stone-100 text-stone-900 hover:bg-stone-200'}
                `}>
                  {tier.cta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </button>

                <div className="space-y-4 flex-1">
                  <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-4">Features included</p>
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm text-stone-600">
                      <Check size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20 px-6 bg-[#f5f3ef] border-y border-stone-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Compare features</h2>
              <p className="text-stone-600">Detailed breakdown of what's included in each plan.</p>
            </div>

            {/* Table Container */}
            <div className="bg-white border border-stone-200 shadow-sm overflow-hidden">
               {/* Header Row */}
               <div className="grid grid-cols-4 border-b-2 border-stone-900 bg-stone-50">
                 <div className="p-4 md:p-6 font-mono text-xs uppercase tracking-widest text-stone-500">Feature</div>
                 <div className="p-4 md:p-6 font-bold text-center text-stone-900 border-l border-stone-200">Starter</div>
                 <div className="p-4 md:p-6 font-bold text-center text-stone-900 bg-orange-50/50 border-l border-stone-200">Pro</div>
                 <div className="p-4 md:p-6 font-bold text-center text-stone-900 border-l border-stone-200">Business</div>
               </div>

               {/* Usage Section */}
               <div className="px-6 py-3 bg-stone-100 font-mono text-xs font-bold uppercase tracking-widest text-stone-500 border-b border-stone-200">Usage Limits</div>
               <div className="grid grid-cols-4 border-b border-stone-100 hover:bg-stone-50">
                 <div className="p-4 text-sm font-medium text-stone-900">Responses</div>
                 <div className="p-4 text-sm text-center text-stone-600 border-l border-stone-100">100 / mo</div>
                 <div className="p-4 text-sm text-center text-stone-900 font-bold border-l border-stone-100 bg-orange-50/20">2,500 / mo</div>
                 <div className="p-4 text-sm text-center text-stone-600 border-l border-stone-100">10,000 / mo</div>
               </div>
               <div className="grid grid-cols-4 border-b border-stone-100 hover:bg-stone-50">
                 <div className="p-4 text-sm font-medium text-stone-900">File Storage</div>
                 <div className="p-4 text-sm text-center text-stone-600 border-l border-stone-100">100 MB</div>
                 <div className="p-4 text-sm text-center text-stone-900 font-bold border-l border-stone-100 bg-orange-50/20">2 GB</div>
                 <div className="p-4 text-sm text-center text-stone-600 border-l border-stone-100">10 GB</div>
               </div>

               {/* Features Section */}
               <div className="px-6 py-3 bg-stone-100 font-mono text-xs font-bold uppercase tracking-widest text-stone-500 border-b border-stone-200">Customization</div>
               {[
                 { label: "Remove Branding", starter: false, pro: true, business: true },
                 { label: "Custom CSS", starter: false, pro: true, business: true },
                 { label: "Custom Fonts", starter: false, pro: true, business: true },
                 { label: "Redirect on Complete", starter: false, pro: true, business: true },
                 { label: "Custom Domain", starter: false, pro: false, business: true },
               ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-4 border-b border-stone-100 hover:bg-stone-50">
                    <div className="p-4 text-sm font-medium text-stone-900">{row.label}</div>
                    <div className="p-4 text-center border-l border-stone-100 flex justify-center text-stone-300">
                      {row.starter ? <Check size={18} className="text-stone-900"/> : <Minus size={18}/>}
                    </div>
                    <div className="p-4 text-center border-l border-stone-100 flex justify-center bg-orange-50/20 text-stone-300">
                      {row.pro ? <Check size={18} className="text-stone-900"/> : <Minus size={18}/>}
                    </div>
                    <div className="p-4 text-center border-l border-stone-100 flex justify-center text-stone-300">
                      {row.business ? <Check size={18} className="text-stone-900"/> : <Minus size={18}/>}
                    </div>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Frequently Asked Questions</h2>
            <div className="h-1 w-20 bg-orange-300 mx-auto"></div>
          </div>
          
          <div className="space-y-2">
            <FAQItem 
              question="Can I cancel my subscription anytime?" 
              answer="Yes, absolutely. There are no contracts or hidden fees. You can cancel your subscription at any time from your account settings, and you will continue to have access until the end of your billing cycle."
            />
            <FAQItem 
              question="What happens if I go over my response limit?" 
              answer="We'll send you an email notification when you reach 90% of your limit. If you exceed the limit, new respondents will see a message that the form is currently unavailable. You can upgrade instantly to lift the limit."
            />
            <FAQItem 
              question="Do you offer discounts for non-profits?" 
              answer="Yes! We love supporting organizations that are doing good in the world. Contact our support team with proof of your non-profit status, and we'll set you up with a 50% discount on any paid plan."
            />
            <FAQItem 
              question="Can I remove the 'Powered by PaperFill' branding?" 
              answer="Yes, branding removal is available on the Pro and Business plans. The Starter plan will always include a small badge in the footer of your forms."
            />
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="py-20 bg-stone-900 text-[#fdfbf7] px-6 text-center">
           <div className="max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-8 text-orange-400">
                 <Shield size={32} />
              </div>
              <h2 className="text-4xl font-serif font-bold mb-6">Need enterprise security?</h2>
              <p className="text-xl text-stone-400 font-light mb-10 max-w-2xl mx-auto">
                 We offer SSO, HIPAA compliance, dedicated success managers, and custom SLAs for large organizations.
              </p>
              <button className="bg-white text-stone-900 px-8 py-4 font-bold hover:bg-orange-100 transition-colors">
                 Talk to Enterprise Sales
              </button>
           </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default PricingPage;