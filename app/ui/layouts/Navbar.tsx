import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { Link, useLocation } from "@remix-run/react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  const navLinks = [
    { name: "Fitur", href: "/#fitur" },
    { name: "Tema", href: "/themes" },
    { name: "Testimoni", href: "/#testimoni" },
    { name: "Portofolio", href: "/portfolio" },
    { name: "Syarat & Ketentuan", href: "/syarat-dan-ketentuan" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (isHomePage && href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.substring(2);
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link to="/">
          <img
            src="/logo-pestaria.png"
            alt="Logo Pestaria"
            className="h-32 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-slate-600 hover:text-orange-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="font-semibold text-slate-600 hover:text-orange-500 transition-colors"
          >
            Masuk
          </Link>
          <Link
            to="/builder"
            className="rounded-full bg-orange-500 px-6 py-2.5 text-white font-semibold transition-transform hover:scale-105 shadow-lg shadow-orange-500/20"
          >
            Buat Undangan
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 absolute top-20 left-0 w-full shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setIsMenuOpen(false);
                }}
                className="text-slate-600 hover:text-orange-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-200" />
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-600 hover:text-orange-500 transition-colors"
            >
              Masuk
            </Link>
            <Link
              to="/builder"
              className="w-full text-center rounded-full bg-orange-500 px-6 py-3 text-white font-semibold transition-transform hover:scale-105 shadow-lg shadow-orange-500/20"
            >
              Buat Undangan
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
