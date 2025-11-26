import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { Link, useLocation } from "@remix-run/react";

type NavLink = {
  name: string;
  href: string;
};

interface NavbarProps {
  navLinks?: NavLink[];
  activeLink?: string;
}

function Navbar({ navLinks: customNavLinks, activeLink }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const defaultNavLinks = [
    { name: "Solutions", href: "/solutions" },
    { name: "Templates", href: "/templates" },
    { name: "Resources", href: "/resources" },
    { name: "Desain", href: "/desain" },
    { name: "Pricing", href: "/pricing" },
    { name: "Terms & Conditions", href: "/terms-and-condition" },
  ];

  const navLinks = customNavLinks || defaultNavLinks;

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === '/' && href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.substring(2);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    } else {
        setMobileMenuOpen(false);
    }
  };


  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#fdfbf7]/90 backdrop-blur-md border-b border-stone-200 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-stone-900 rounded-none flex items-center justify-center text-[#fdfbf7] font-serif font-bold border border-stone-900">P</div>
            <span className="text-xl font-serif font-bold tracking-tight text-stone-900">PaperFill</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={
                  activeLink === link.name
                  ? "text-stone-900 font-bold underline decoration-1 underline-offset-4"
                  : "text-stone-600 hover:text-stone-900 font-medium transition-colors hover:underline decoration-1 underline-offset-4"
                }
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-stone-900 font-medium hover:text-orange-600 px-4 py-2 font-serif italic">Log in</Link>
            <Link to="/create" className="bg-stone-900 text-[#fdfbf7] px-6 py-2.5 rounded-none border border-stone-900 font-medium hover:bg-[#fdfbf7] hover:text-stone-900 transition-all active:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(28,25,23,0.2)]">
              Get Started
            </Link>
          </div>

          <button className="md:hidden text-stone-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#fdfbf7] pt-24 px-6 md:hidden animate-in slide-in-from-top-10">
          <div className="flex flex-col gap-6 text-xl font-serif font-medium text-stone-900">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={activeLink === link.name ? "text-orange-600" : ""}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-stone-200" />
            <Link to="/builder" onClick={() => setMobileMenuOpen(false)} className="bg-stone-900 text-white py-4 w-full text-center">Sign Up Free</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
