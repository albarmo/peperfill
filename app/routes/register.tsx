import React, { useState } from 'react';
import { 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles,
  Command,
  Github,
  Pencil,
  LayoutTemplate
} from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
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
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 bg-stone-900 rounded-none flex items-center justify-center text-[#fdfbf7] font-serif font-bold border border-stone-900">P</div>
            <span className="text-xl font-serif font-bold tracking-tight text-stone-900">PaperFill</span>
          </div>

          {/* Abstract Art Composition: "The Blueprint" */}
          <div className="relative z-10 my-auto">
            <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
               
               {/* Background Layer (Draft Paper) */}
               <div className="absolute w-3/4 h-3/4 bg-blue-50 border border-blue-200 shadow-sm rotate-6 p-6 flex flex-col items-center justify-center">
                  <div className="w-full h-full border-2 border-dashed border-blue-200 rounded-lg opacity-50"></div>
               </div>

               {/* Foreground Layer (Main Card) */}
               <div className="absolute w-3/4 h-3/4 bg-white border border-stone-200 shadow-xl -rotate-3 p-8 flex flex-col items-start justify-between transition-transform hover:rotate-0 duration-700">
                  <div className="w-full flex justify-between items-start">
                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
                       <LayoutTemplate size={24} />
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-mono uppercase tracking-widest rounded-full">New Account</div>
                  </div>
                  
                  <div className="space-y-4 w-full">
                     <div className="w-full h-2 bg-stone-100 rounded"></div>
                     <div className="w-2/3 h-2 bg-stone-100 rounded"></div>
                     <div className="flex gap-2 mt-4">
                        <div className="w-8 h-8 bg-stone-900 rounded-full"></div>
                        <div className="w-8 h-8 bg-orange-200 rounded-full mix-blend-multiply -ml-4"></div>
                     </div>
                  </div>
                  
                  {/* Decorative Pencil */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-4 bg-yellow-400 border border-stone-800 rotate-45 flex items-center">
                     <div className="w-6 h-full bg-pink-300 border-r border-stone-800"></div> {/* Eraser */}
                     <div className="w-4 h-full bg-stone-300 border-r border-stone-800"></div> {/* Ferrule */}
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="relative z-10">
            <p className="text-stone-500 font-serif italic text-lg">
              "The best way to predict the future is to create it."
            </p>
          </div>
        </div>

        {/* Right Panel: Register Form */}
        <div className="w-full md:w-1/2 lg:w-[55%] bg-white flex flex-col justify-center items-center p-8 md:p-16 relative">
           
           {/* Mobile Logo */}
           <div className="absolute top-8 left-8 md:hidden flex items-center gap-3">
            <div className="w-8 h-8 bg-stone-900 rounded-none flex items-center justify-center text-[#fdfbf7] font-serif font-bold">P</div>
            <span className="text-xl font-serif font-bold text-stone-900">PaperFill</span>
           </div>

           <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 tracking-tight">Get started.</h1>
                <p className="text-stone-500 text-lg font-light">
                  Create your account. No credit card needed.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                 {/* Name Input */}
                 <div className="space-y-2 group">
                   <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 group-focus-within:text-stone-900 transition-colors">Full Name</label>
                   <input 
                     type="text" 
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="w-full bg-transparent border-b border-stone-300 py-3 text-xl font-serif text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors"
                     placeholder="John Doe"
                   />
                 </div>

                 {/* Email Input */}
                 <div className="space-y-2 group">
                   <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 group-focus-within:text-stone-900 transition-colors">Work Email</label>
                   <input 
                     type="email" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full bg-transparent border-b border-stone-300 py-3 text-xl font-serif text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors"
                     placeholder="name@company.com"
                   />
                 </div>

                 {/* Password Input */}
                 <div className="space-y-2 group">
                   <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 group-focus-within:text-stone-900 transition-colors">Password</label>
                   <div className="relative">
                     <input 
                       type={showPassword ? "text" : "password"} 
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-full bg-transparent border-b border-stone-300 py-3 text-xl font-serif text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors pr-10"
                       placeholder="Min. 8 characters"
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

                 {/* Terms Checkbox */}
                 <div className="flex items-start gap-3 pt-2">
                    <div className="relative flex items-center h-5">
                      <input 
                        id="terms" 
                        type="checkbox" 
                        className="w-4 h-4 border-stone-300 text-stone-900 focus:ring-stone-900 rounded-sm"
                      />
                    </div>
                    <label htmlFor="terms" className="text-sm text-stone-500 leading-tight">
                      I agree to the <a href="#" className="underline text-stone-900">Terms of Service</a> and <a href="#" className="underline text-stone-900">Privacy Policy</a>.
                    </label>
                 </div>

                 {/* Submit Button */}
                 <button 
                   type="submit" 
                   disabled={isLoading || !email || !password || !name}
                   className="w-full bg-stone-900 text-[#fdfbf7] py-4 px-6 font-bold text-lg hover:bg-stone-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0px_0px_rgba(28,25,23,0.2)] active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 group"
                 >
                   {isLoading ? (
                     <span className="animate-pulse">Creating Account...</span>
                   ) : (
                     <>
                       Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                     </>
                   )}
                 </button>
              </form>

              {/* Social Login */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-stone-400 font-mono tracking-widest">Or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-stone-300 hover:border-stone-900 hover:bg-stone-50 transition-colors bg-transparent text-stone-600 font-medium group">
                   <Command size={18} /> Google
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-stone-300 hover:border-stone-900 hover:bg-stone-50 transition-colors bg-transparent text-stone-600 font-medium group">
                   <Github size={18} /> GitHub
                </button>
              </div>

              <p className="text-center text-stone-500 text-sm">
                Already have an account? <a href="/login" className="text-stone-900 font-bold underline decoration-1 underline-offset-2 hover:text-orange-600 transition-colors">Log in</a>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;