import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Link } from '@remix-run/react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-orange-200 selection:text-orange-900 flex overflow-hidden">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] z-0 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row">
        
        {/* Left Panel: Brand & Art (Hidden on mobile) */}
        <div className="hidden md:flex w-1/2 lg:w-[45%] bg-[#f5f3ef] border-r border-stone-200 relative flex-col p-12 justify-between overflow-hidden">
          {/* Decorative Pattern Background */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23000000' fill-opacity='1'/%3E%3C/svg%3E")` }}>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 bg-stone-900 rounded-none flex items-center justify-center text-[#fdfbf7] font-serif font-bold border border-stone-900">P</div>
            <span className="text-xl font-serif font-bold tracking-tight text-stone-900">PaperFill</span>
          </div>

          {/* Abstract Art Composition: "The Key" */}
          <div className="relative z-10 my-auto">
            <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
               
               {/* Floating Lock Concept */}
               <div className="relative z-10">
                  {/* Lock Body */}
                  <div className="w-32 h-24 bg-stone-900 rounded-lg shadow-2xl relative flex items-center justify-center border border-stone-800">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                    <div className="w-1 h-6 bg-white absolute top-1/2 mt-2"></div>
                  </div>
                  
                  {/* Lock Shackle (Paperclip style) */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20 rounded-t-full border-[12px] border-stone-300 -z-10"></div>
                  
                  {/* Abstract Key */}
                  <div className="absolute -right-12 -bottom-8 w-32 h-12 bg-orange-200 mix-blend-multiply rotate-[-15deg] rounded-r-full border border-orange-300 flex items-center opacity-90 animate-pulse">
                     <div className="w-3 h-3 bg-stone-900 rounded-full ml-4"></div>
                  </div>
               </div>

               {/* Background Paper Elements */}
               <div className="absolute w-64 h-64 bg-white border border-stone-200 rotate-6 -z-20 shadow-sm"></div>
               <div className="absolute w-56 h-56 bg-stone-100 border border-stone-200 -rotate-3 -z-10 shadow-sm top-10 left-10"></div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="relative z-10">
            <p className="text-stone-500 font-serif italic text-lg">
              "Security isn't just a feature, it's a promise."
            </p>
          </div>
        </div>

        {/* Right Panel: Forgot Password Form */}
        <div className="w-full md:w-1/2 lg:w-[55%] bg-white flex flex-col justify-center items-center p-8 md:p-16 relative">
           
           {/* Mobile Logo */}
           <div className="absolute top-8 left-8 md:hidden flex items-center gap-3">
            <div className="w-8 h-8 bg-stone-900 rounded-none flex items-center justify-center text-[#fdfbf7] font-serif font-bold">P</div>
            <span className="text-xl font-serif font-bold text-stone-900">PaperFill</span>
           </div>

           <div className="w-full max-w-md space-y-10">
              
              {!isSent ? (
                // STATE 1: Input Form
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                  <div className="text-center md:text-left">
                    <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-stone-600 mb-6 md:mx-0 mx-auto">
                      <KeyRound size={24} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 tracking-tight">Forgot password?</h1>
                    <p className="text-stone-500 text-lg font-light">
                      No worries. Enter your email and we'll send you reset instructions.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="space-y-2 group">
                       <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 group-focus-within:text-stone-900 transition-colors">Email Address</label>
                       <input 
                         type="email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="w-full bg-transparent border-b border-stone-300 py-3 text-xl font-serif text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors"
                         placeholder="name@company.com"
                         autoFocus
                       />
                     </div>

                     <button 
                       type="submit" 
                       disabled={isLoading || !email}
                       className="w-full bg-stone-900 text-[#fdfbf7] py-4 px-6 font-bold text-lg hover:bg-stone-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0px_0px_rgba(28,25,23,0.2)] active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 group"
                     >
                       {isLoading ? (
                         <span className="animate-pulse">Sending link...</span>
                       ) : (
                         <>
                           Send Reset Link <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                         </>
                       )}
                     </button>
                  </form>

                  <div className="text-center md:text-left pt-4">
                    <a href="#" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-medium text-sm group">
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to log in
                    </a>
                  </div>
                </div>
              ) : (
                // STATE 2: Success Message
                <div className="animate-in zoom-in-95 duration-500 text-center md:text-left space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 md:mx-0 mx-auto border border-green-200">
                    <Send size={32} strokeWidth={1.5} className="ml-1 mt-1" />
                  </div>
                  
                  <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">Check your email</h1>
                    <p className="text-stone-500 text-lg font-light leading-relaxed">
                      We've sent a password reset link to <br/>
                      <span className="font-bold text-stone-900 border-b border-stone-300 pb-0.5">{email}</span>
                    </p>
                  </div>

                  <div className="bg-stone-50 p-6 rounded border border-stone-200 text-sm text-stone-600">
                    <p className="mb-2 font-bold flex items-center gap-2">
                       <ShieldCheck size={16} /> Didn't receive the email?
                    </p>
                    <p>Check your spam folder or <button onClick={() => setIsSent(false)} className="underline text-stone-900 hover:text-orange-600">try another email address</button>.</p>
                  </div>

                  <div className="pt-4">
                    <Link to="/login" className="w-full bg-stone-900 text-[#fdfbf7] py-4 px-6 font-bold text-lg hover:bg-stone-800 transition-all shadow-[4px_4px_0px_0px_rgba(28,25,23,0.2)] active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2">
                       Back to Log in <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;