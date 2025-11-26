import { Instagram, Facebook, Twitter } from "lucide-react";

function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
  ];
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            Siap Membuat Momen Tak Terlupakan?
          </h2>
          <div className="mt-8">
            <a
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105 shadow-2xl shadow-orange-500/30"
            >
              Gabung Sekarang
            </a>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} Pestaria. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="text-slate-400 hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;