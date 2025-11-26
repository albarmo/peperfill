import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { Link } from '@remix-run/react';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword || password !== confirmPassword) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
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
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17L3 10l7-7 7 7-7 7z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 bg-stone-900 rounded-none flex items-center justify-center text-[#fdfbf7] font-serif font-bold border border-stone-900">P</div>
            <span className="text-xl font-serif font-bold tracking-tight text-stone-900">PaperFill</span>
          </div>

          {/* Abstract Art Composition: "The Safe" */}
          <div className="relative z-10 my-auto">
            <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
               
               {/* Main "Safe" Box */}
               <div className="relative w-48 h-48 bg-stone-800 border-2 border-stone-900 shadow-2xl rotate-3 flex flex-col items-center justify-center z-10">
                  {/* Dial */}
                  <div className="w-24 h-24 rounded-full border-4 border-stone-600 bg-stone-700 flex items-center justify-center relative shadow-inner">
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-stone-500"></div>
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-stone-500"></div>
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-1 bg-stone-500"></div>
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-1 bg-stone-500"></div>
                     
                     {/* Rotate Animation for Dial */}
                     <div className="absolute w-full h-full rounded-full border-t-4 border-orange-400 opacity-50 animate-spin duration-[3000ms]"></div>
                  </div>
                  
                  {/* Handle */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-12 bg-stone-600 rounded"></div>
               </div>

               {/* Background Layers */}
               <div className="absolute w-56 h-56 bg-orange-100 border border-orange-200 -rotate-6 -z-10 shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute w-64 h-64 bg-white border border-stone-200 rotate-12 -z-20 shadow-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="relative z-10">
            <p className="text-stone-500 font-serif italic text-lg">
              "A fresh start. Secure by design."
            </p>
          </div>
        </div>

        {/* Right Panel: Reset Form */}
        <div className="w-full md:w-1/2 lg:w-[55%] bg-white flex flex-col justify-center items-center p-8 md:p-16 relative">
           
           {/* Mobile Logo */}
           <div className="absolute top-8 left-8 md:hidden flex items-center gap-3">
            <div className="w-8 h-8 bg-stone-900 rounded-none flex items-center justify-center text-[#fdfbf7] font-serif font-bold">P</div>
            <span className="text-xl font-serif font-bold text-stone-900">PaperFill</span>
           </div>

           <div className="w-full max-w-md space-y-10">
              
              {!isSuccess ? (
                // STATE 1: Input Form
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                  <div className="text-center md:text-left">
                    <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-stone-600 mb-6 md:mx-0 mx-auto">
                      <Lock size={24} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 tracking-tight">Set new password</h1>
                    <p className="text-stone-500 text-lg font-light">
                      Please choose something secure.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                     {/* New Password */}
                     <div className="space-y-2 group">
                       <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 group-focus-within:text-stone-900 transition-colors">New Password</label>
                       <div className="relative">
                         <input 
                           type={showPassword ? "text" : "password"} 
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="w-full bg-transparent border-b border-stone-300 py-3 text-xl font-serif text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors pr-10"
                           placeholder="Min. 8 characters"
                           autoFocus
                         />
                         <button 
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 transition-colors"
                         >
                           {showPassword ? <EyeOff size={20} strokeWidth={1.5} /> : <Eye size={20} strokeWidth={1.5} />}
                         </button>
                       </div>
                     </div>

                     {/* Confirm Password */}
                     <div className="space-y-2 group">
                       <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 group-focus-within:text-stone-900 transition-colors">Confirm Password</label>
                       <div className="relative">
                         <input 
                           type={showPassword ? "text" : "password"} 
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           className="w-full bg-transparent border-b border-stone-300 py-3 text-xl font-serif text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors pr-10"
                           placeholder="Re-enter password"
                         />
                         {confirmPassword && password === confirmPassword && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-green-600 animate-in fade-in">
                                <CheckCircle2 size={20} />
                            </div>
                         )}
                       </div>
                     </div>

                     <button 
                       type="submit" 
                       disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
                       className="w-full bg-stone-900 text-[#fdfbf7] py-4 px-6 font-bold text-lg hover:bg-stone-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0px_0px_rgba(28,25,23,0.2)] active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 group"
                     >
                       {isLoading ? (
                         <span className="animate-pulse">Updating...</span>
                       ) : (
                         <>
                           Reset Password <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                         </>
                       )}
                     </button>
                  </form>
                </div>
              ) : (
                // STATE 2: Success Message
                <div className="animate-in zoom-in-95 duration-500 text-center md:text-left space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 md:mx-0 mx-auto border border-green-200">
                    <ShieldCheck size={32} strokeWidth={1.5} className="ml-1 mt-1" />
                  </div>
                  
                  <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">All set!</h1>
                    <p className="text-stone-500 text-lg font-light leading-relaxed">
                      Your password has been successfully reset. <br/>You can now log in with your new credentials.
                    </p>
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

export default ResetPasswordPage;