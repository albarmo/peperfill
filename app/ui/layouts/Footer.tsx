import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#fdfbf7] pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-stone-900 rounded-none flex items-center justify-center text-white font-serif font-bold">P</div>
            <span className="text-xl font-serif font-bold text-stone-900">PaperFill</span>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed font-serif">
            Handcrafted in the cloud. <br />
            Designed for the thoughtful web.
          </p>
        </div>

        <div>
          <h4 className="font-bold font-serif text-stone-900 mb-6">Product</h4>
          <ul className="space-y-4 text-stone-600 text-sm">
            <li><a href="#" className="hover:text-stone-900 hover:underline decoration-1 underline-offset-4">Templates</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline decoration-1 underline-offset-4">Integrations</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline decoration-1 underline-offset-4">Pricing</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline decoration-1 underline-offset-4">What's New</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold font-serif text-stone-900 mb-6">Resources</h4>
          <ul className="space-y-4 text-stone-600 text-sm">
            <li><a href="#" className="hover:text-stone-900 hover:underline decoration-1 underline-offset-4">Blog</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline decoration-1 underline-offset-4">Help Center</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline decoration-1 underline-offset-4">Community</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline decoration-1 underline-offset-4">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold font-serif text-stone-900 mb-6">Company</h4>
          <ul className="space-y-4 text-stone-600 text-sm">
            <li><a href="#" className="hover:text-stone-900 hover:underline decoration-1 underline-offset-4">About</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline decoration-1 underline-offset-4">Careers</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline decoration-1 underline-offset-4">Terms</a></li>
            <li><a href="#" className="hover:text-stone-900 hover:underline decoration-1 underline-offset-4">Privacy</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-stone-200 text-sm text-stone-400 font-mono">
        <p>© 2024 PaperFill Inc.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-stone-600">Twitter</a>
          <a href="#" className="hover:text-stone-600">LinkedIn</a>
          <a href="#" className="hover:text-stone-600">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
