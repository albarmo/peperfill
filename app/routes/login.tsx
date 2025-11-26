import React, { useState } from 'react';
import { 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Sparkles,
  Command,
  Github} from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
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
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 bg-stone-900 rounded-none flex items-center justify-center text-[#fdfbf7] font-serif font-bold border border-stone-900">P</div>
            <span className="text-xl font-serif font-bold tracking-tight text-stone-900">PaperFill</span>
          </div>

          {/* Abstract Art Composition */}
          <div className="relative z-10 my-auto">
            <div className="relative w-full max-w-md mx-auto aspect-square">
               {/* Paper Sheet 1 */}
               <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-white border border-stone-200 shadow-lg rotate-3 p-6 flex flex-col">
                  <div className="w-12 h-12 rounded-full bg-orange-100 border border-orange-200 mb-4 flex items-center justify-center text-orange-600">
                    <Sparkles size={24} />
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-stone-100 rounded"></div>
                    <div className="h-2 w-5/6 bg-stone-100 rounded"></div>
                    <div className="h-2 w-4/6 bg-stone-100 rounded"></div>
                  </div>
                  {/* Tape */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-yellow-100/80 -rotate-2 border-l border-r border-white/50"></div>
               </div>

               {/* Paper Sheet 2 */}
               <div className="absolute bottom-8 left-0 w-2/3 h-2/3 bg-stone-900 border border-stone-800 shadow-xl -rotate-2 p-6 flex flex-col justify-between text-[#fdfbf7]">
                  <div className="font-serif text-2xl italic">"Simplicity is the ultimate sophistication."</div>
                  <div className="flex items-center gap-2 text-stone-500 text-xs font-mono uppercase tracking-widest">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    System Online
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="relative z-10">
            <p className="text-stone-500 font-serif italic text-lg">
              Trusted by 10,000+ teams to collect better data.
            </p>
          </div>
        </div>

        {/* Right Panel: Login Form */}
        <div className="w-full md:w-1/2 lg:w-[55%] bg-white flex flex-col justify-center items-center p-8 md:p-16 relative">
           
           {/* Mobile Logo (Only visible on small screens) */}
           <div className="absolute top-8 left-8 md:hidden flex items-center gap-3">
            <div className="w-8 h-8 bg-stone-900 rounded-none flex items-center justify-center text-[#fdfbf7] font-serif font-bold">P</div>
            <span className="text-xl font-serif font-bold text-stone-900">PaperFill</span>
           </div>

           <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 tracking-tight">Welcome back.</h1>
                <p className="text-stone-500 text-lg font-light">
                  Please enter your details to sign in.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                 {/* Email Input */}
                 <div className="space-y-2 group">
                   <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 group-focus-within:text-stone-900 transition-colors">Email Address</label>
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
                   <div className="flex justify-between items-center">
                     <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 group-focus-within:text-stone-900 transition-colors">Password</label>
                     <a href="/forgot-password" className="text-xs font-mono text-stone-400 hover:text-stone-900 underline decoration-1 underline-offset-2">Forgot?</a>
                   </div>
                   <div className="relative">
                     <input 
                       type={showPassword ? "text" : "password"} 
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-full bg-transparent border-b border-stone-300 py-3 text-xl font-serif text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors pr-10"
                       placeholder="••••••••"
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

                 {/* Submit Button */}
                 <button 
                   type="submit" 
                   disabled={isLoading || !email || !password}
                   className="w-full bg-stone-900 text-[#fdfbf7] py-4 px-6 font-bold text-lg hover:bg-stone-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0px_0px_rgba(28,25,23,0.2)] active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 group"
                 >
                   {isLoading ? (
                     <span className="animate-pulse">Signing in...</span>
                   ) : (
                     <>
                       Sign in <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
                  <span className="bg-white px-4 text-stone-400 font-mono tracking-widest">Or continue with</span>
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
                Don't have an account? <a href="/register" className="text-stone-900 font-bold underline decoration-1 underline-offset-2 hover:text-orange-600 transition-colors">Sign up for free</a>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;