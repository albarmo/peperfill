import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import {
  ArrowRight,
  BookHeart,
  ChevronDown,
  Clock,
  Facebook,
  Gift,
  Image as ImageIcon,
  Instagram,
  Menu,
  Palette,
  Send,
  Users,
  X,
  Sparkles,
  Twitter,
} from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Pestaria | Undangan Digital Modern & Menyenangkan" },
    { name: "description", content: "Buat dan bagikan undangan digital yang elegan dan modern dalam hitungan menit. Cepat, mudah, dan ramah lingkungan." },
  ];
};

export default function LandingPage() {
  return (
    <div className="bg-slate-50 font-sans text-slate-800 antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsCtaSection />
        <ThemeShowcaseSection />
        <HowItWorksSection />
        <PartnersSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Fitur", "Desain", "Harga", "FAQ"];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <a href="#" className="text-2xl font-bold text-teal-600">Pestaria</a>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-slate-600 hover:text-teal-600 transition-colors">{link}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-slate-600 hover:text-teal-600 transition-colors">Masuk</Link>
          <Link to="/register" className="rounded-full bg-teal-500 px-6 py-2.5 text-white transition-transform hover:scale-105">Buat Undangan</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 absolute top-20 left-0 w-full shadow-lg">
          <nav className="flex flex-col space-y-4">
             {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-slate-600 hover:text-teal-600 transition-colors">{link}</a>
            ))}
            <hr className="border-slate-200" />
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-slate-600 hover:text-teal-600 transition-colors">Masuk</Link>
            <Link to="/register" className="w-full text-center rounded-full bg-teal-500 px-6 py-2.5 text-white transition-transform hover:scale-105">Buat Undangan</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section className="pt-24 md:pt-32 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Rayakan Momen Spesialmu, <span className="text-teal-500">Sebarkan Kebahagiaan</span>.
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-lg mx-auto md:mx-0">
            Buat dan bagikan undangan digital yang elegan dan modern dalam hitungan menit. Cepat, mudah, dan ramah lingkungan.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
             <a href="#" className="group inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105">
              Coba Gratis Sekarang
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            ✨ Dipercaya oleh <span className="font-semibold text-slate-700">10.000+</span> pasangan bahagia
          </p>
        </div>
        <div className="relative">
          <div className="bg-teal-100 rounded-3xl w-full h-96 md:h-[500px] transform rotate-3 transition hover:rotate-0 hover:scale-105">
             <div className="absolute inset-4 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <p className="text-slate-400">Contoh Undangan</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
    const features = [
        { icon: Palette, title: "Desain Premium", description: "Pilih dari puluhan template eksklusif yang bisa disesuaikan." },
        { icon: Gift, title: "Amplop & Hadiah Digital", description: "Kirim hadiah dan amplop digital dengan mudah dan aman." },
        { icon: BookHeart, title: "Buku Tamu & Ucapan", description: "Abadikan doa dan ucapan dari para tamu undangan." },
        { icon: Users, title: "Manajemen Tamu (RSVP)", description: "Lacak konfirmasi kehadiran tamu secara real-time." },
        { icon: ImageIcon, title: "Galeri Foto & Video", description: "Bagikan momen pre-wedding dan cerita cinta Anda." },
        { icon: Clock, title: "Hitung Mundur Acara", description: "Buat antisipasi dengan penghitung waktu mundur ke hari H." },
    ];

  return (
    <section id="fitur" className="py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Semua yang Kamu Butuhkan dalam Satu Platform</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Fitur lengkap untuk memastikan acara spesial Anda berjalan sempurna dari awal hingga akhir.</p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {features.map(({icon: Icon, title, description}) => (
            <div key={title} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-teal-100 text-teal-600 w-12 h-12 rounded-xl flex items-center justify-center">
                    <Icon size={24} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-800">{title}</h3>
                <p className="mt-2 text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsCtaSection() {
    const stats = [
        { icon: Sparkles, value: "5,738", suffix: "+", label: "Undangan Dibuat" },
        { icon: Palette, value: "27", suffix: "+", label: "Pilihan Tema Design" },
        { icon: Send, value: "27,389", suffix: "", label: "Undangan Disebar" },
        { icon: BookHeart, value: "135,678", suffix: "", label: "Ucapan & Do'a" },
    ];

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                            Buat undangan dalam 10 Menit, <span className="text-teal-500">tanpa antrian!</span>
                        </h2>
                        <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
                            Tak perlu menunggu lama untuk undangan yang sempurna. Dalam 10 menit, Anda dapat menciptakan undangan digital yang elegan dan langsung bisa dibagikan. Mudah, cepat, dan praktis untuk momen istimewa Anda.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        {stats.map(({ icon: Icon, value, suffix, label }) => (
                            <div key={label} className="flex flex-col items-center text-center">
                                <div className="bg-teal-100 text-teal-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                  <Icon size={24} />
                                </div>
                                <p className="text-4xl md:text-5xl font-bold text-teal-500">
                                  {value}<span className="text-3xl">{suffix}</span>
                                </p>
                                <p className="mt-2 text-slate-500">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


function ThemeShowcaseSection() {
    return (
        <section id="desain" className="py-20 md:py-32 bg-slate-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Pilih Desain yang Mewakili Ceritamu</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Setiap pasangan unik, begitu pula dengan desain undangan yang kami sediakan.</p>
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="group aspect-[9/16] bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform hover:-translate-y-2">
                           <div className="w-full h-full bg-teal-100 flex items-center justify-center">
                             <p className="text-slate-400">Tema Desain {i}</p>
                           </div>
                        </div>
                    ))}
                </div>
                <div className="mt-16">
                    <a href="#" className="group inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105">
                        Lihat Semua Desain
                    </a>
                </div>
            </div>
        </section>
    );
}

function HowItWorksSection() {
  return (
    <section id="harga" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Hanya 3 Langkah Mudah</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Mulai perjalanan digital Anda bersama kami tanpa ribet.</p>
        <div className="mt-16 relative grid lg:grid-cols-3 gap-8 lg:gap-16">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px -translate-y-12">
             <svg width="100%" height="2"><line x1="0" y1="1" x2="100%" y2="1" strokeWidth="2" strokeDasharray="8" className="stroke-slate-300"/></svg>
          </div>
          
          <div className="relative bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-teal-500 text-white font-bold text-xl rounded-full flex items-center justify-center border-4 border-slate-50">01</div>
            <h3 className="mt-8 text-xl font-bold text-slate-800">Isi Detail Acara</h3>
            <p className="mt-2 text-slate-500">Lengkapi informasi nama mempelai, tanggal, lokasi, dan cerita cinta Anda.</p>
          </div>
           <div className="relative bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-teal-500 text-white font-bold text-xl rounded-full flex items-center justify-center border-4 border-slate-50">02</div>
            <h3 className="mt-8 text-xl font-bold text-slate-800">Pilih Desain & Fitur</h3>
            <p className="mt-2 text-slate-500">Pilih tema favorit dan aktifkan fitur-fitur yang Anda butuhkan.</p>
          </div>
           <div className="relative bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-teal-500 text-white font-bold text-xl rounded-full flex items-center justify-center border-4 border-slate-50">03</div>
            <h3 className="mt-8 text-xl font-bold text-slate-800">Bagikan Undangan</h3>
            <p className="mt-2 text-slate-500">Undangan Anda siap dibagikan ke seluruh tamu melalui media sosial.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const partners = [
    'Mitra A', 'Mitra B', 'Mitra C', 'Mitra D', 'Mitra E', 'Mitra F', 'Mitra G', 'Mitra H'
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50">
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
        `}
      </style>
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600">Partner</h3>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">Mitra Pestaria</h2>
        
        <div className="relative mt-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((name, index) => (
              <div key={index} className="mx-4 flex h-24 w-48 flex-shrink-0 items-center justify-center rounded-lg bg-white p-4 shadow-sm grayscale transition-all hover:grayscale-0">
                <span className="text-slate-500 font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <a href="#" className="font-semibold text-teal-600 hover:text-teal-500 transition-colors">
            Gabung Seperti Mereka &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}


function FaqSection() {
  const faqItems = [
    { q: "Apa itu undangan digital?", a: "Undangan digital adalah undangan berbasis web yang bisa diakses melalui link. Ini lebih ramah lingkungan, lebih mudah dibagikan, dan dilengkapi fitur interaktif seperti RSVP, galeri, dan amplop digital." },
    { q: "Berapa lama proses pembuatannya?", a: "Anda bisa membuat undangan digital Anda sendiri dalam waktu kurang dari 15 menit! Prosesnya sangat cepat dan intuitif, cukup isi form, pilih desain, dan undangan Anda siap." },
    { q: "Bisakah saya mengubah desain setelah undangan jadi?", a: "Tentu saja. Anda memiliki akses ke dashboard di mana Anda bisa mengubah detail acara dan beberapa elemen desain bahkan setelah undangan Anda dibagikan." },
    { q: "Apakah ada batasan jumlah tamu?", a: "Tidak ada batasan! Anda bisa membagikan link undangan Anda ke sebanyak mungkin tamu yang Anda inginkan tanpa biaya tambahan." },
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Pertanyaan yang Sering Diajukan</h2>
          <p className="mt-4 text-lg text-slate-600">Menemukan jawaban yang Anda cari? Jika tidak, hubungi kami.</p>
        </div>
        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => (
            <FaqItem key={index} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left p-6 font-semibold text-slate-800 hover:bg-slate-50">
        <span>{question}</span>
        <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out grid ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
         <div className="overflow-hidden">
           <p className="p-6 pt-0 text-slate-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}


function Footer() {
    const socialLinks = [
        { icon: Instagram, href: "#" },
        { icon: Facebook, href: "#" },
        { icon: Twitter, href: "#" },
    ];
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold text-white">Pestaria</h3>
                        <p className="mt-4 text-slate-400">Platform undangan digital modern untuk momen tak terlupakan Anda.</p>
                        <div className="mt-6 flex space-x-4">
                           {socialLinks.map(({icon: Icon, href}, index) => (
                               <a key={index} href={href} className="text-slate-400 hover:text-white"><Icon /></a>
                           ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">Produk</h4>
                        <ul className="mt-4 space-y-2">
                           <li><a href="#fitur" className="hover:text-white">Fitur</a></li>
                           <li><a href="#desain" className="hover:text-white">Desain</a></li>
                           <li><a href="#harga" className="hover:text-white">Harga</a></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white">Perusahaan</h4>
                        <ul className="mt-4 space-y-2">
                           <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
                           <li><a href="#" className="hover:text-white">Kontak</a></li>
                           <li><a href="#" className="hover:text-white">Privasi</a></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white">Hubungi Kami</h4>
                        <ul className="mt-4 space-y-2">
                           <li><a href="mailto:halo@pestaria.com" className="hover:text-white">halo@pestaria.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 border-t border-slate-800 pt-8 text-center text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Pestaria. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
