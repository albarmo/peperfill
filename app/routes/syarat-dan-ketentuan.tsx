import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import {
  Instagram,
  Menu,
  Twitter,
  Facebook,
  X,
  ClipboardList,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/ui/layouts/Navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "Syarat dan Ketentuan - Pestaria" },
    { name: "description", content: "Syarat dan ketentuan layanan undangan digital di Pestaria.com." },
  ];
};

export default function SyaratKetentuanPage() {
  return (
    <div className="bg-slate-50 font-sans text-slate-800 antialiased">
      <Navbar />
      <main>
        <PageHeader />
        <div className="container mx-auto px-6 pt-16 pb-24">
          <div className="max-w-4xl mx-auto space-y-10">
            <ServiceSection />
            <ImportantNotesSection />
            <PrivacySection />
            <AddOnSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PageHeader() {
    return (
        <div className="relative pt-32 pb-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-extrabold">Syarat dan Ketentuan</h1>
                <p className="mt-4 text-lg text-orange-100">Terakhir diperbarui: 18 Oktober 2025</p>
            </div>
        </div>
    );
}

function SectionCard({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
    return (
        <section className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 text-orange-500 rounded-xl flex items-center justify-center">
                    {icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
            </div>
            <div className="space-y-4 text-slate-600 prose max-w-none">
                {children}
            </div>
        </section>
    );
}

function ServiceSection() {
    return (
        <SectionCard icon={<ClipboardList size={24} />} title="Layanan Undangan di Pestaria.com">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold text-xl text-slate-700">1. Self Service (Do-It-Yourself)</h3>
                    <ul className="mt-2 space-y-2 list-none p-0">
                        <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Buat & edit undangan mandiri via dashboard interaktif.</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Akses berbagai tema modern, dengan opsi add-on premium.</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Revisi tanpa batas (data, musik, tema, dll).</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Panduan lengkap tersedia di dashboard.</span></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-xl text-slate-700">2. Full Service</h3>
                    <ul className="mt-2 space-y-2 list-none p-0">
                        <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Dibuatkan oleh tim Pestaria setelah data lengkap.</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Pengerjaan min. 3x24 jam kerja setelah pembayaran.</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Batas revisi gratis, selebihnya dikenakan biaya.</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Pastikan data benar untuk kelancaran proses.</span></li>
                    </ul>
                </div>
            </div>
        </SectionCard>
    );
}

function ImportantNotesSection() {
    return (
        <SectionCard icon={<AlertTriangle size={24} />} title="Catatan Penting">
            <ul className="mt-2 space-y-2 list-none p-0">
                <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Lengkapi semua data termasuk foto untuk mempercepat proses.</span></li>
                <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Demo di katalog adalah contoh hasil dari layanan Full Service.</span></li>
                <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Hubungi Customer Service kami jika ada pertanyaan.</span></li>
            </ul>
        </SectionCard>
    );
}

function PrivacySection() {
    return (
        <SectionCard icon={<ShieldCheck size={24} />} title="Keamanan dan Privasi">
             <ul className="mt-2 space-y-2 list-none p-0">
                <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Keamanan data pengguna adalah prioritas utama kami.</span></li>
                <li className="flex gap-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span>Data pribadi Anda hanya digunakan untuk keperluan pembuatan undangan.</span></li>
            </ul>
        </SectionCard>
    );
}

function AddOnSection() {
    return (
        <SectionCard icon={<Sparkles size={24} />} title="Add-On / Fitur Tambahan">
            <ul className="mt-2 space-y-2 list-none p-0 columns-1 md:columns-2">
                <li className="flex gap-2 mb-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span><strong>Full Service:</strong> Terima jadi tanpa repot.</span></li>
                <li className="flex gap-2 mb-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span><strong>QR Check-In:</strong> Pencatatan kehadiran digital.</span></li>
                <li className="flex gap-2 mb-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span><strong>Custom Domain (.my.id):</strong> Personalisasi domain.</span></li>
                <li className="flex gap-2 mb-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span><strong>Custom Domain (.com):</strong> Domain premium.</span></li>
                <li className="flex gap-2 mb-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span><strong>Masa Aktif Lifetime:</strong> Undangan aktif selamanya.</span></li>
                <li className="flex gap-2 mb-2"><CheckCircle className="text-orange-500 w-5 h-5 mt-1 flex-shrink-0" /><span><strong>WhatsApp Blast:</strong> Kirim undangan massal.</span></li>
            </ul>
        </SectionCard>
    );
}

function Footer() {
    const socialLinks = [{ icon: Instagram, href: "#" }, { icon: Facebook, href: "#" }, { icon: Twitter, href: "#" }];
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="container mx-auto px-6 py-16">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">Siap Membuat Momen Tak Terlupakan?</h2>
                    <div className="mt-8">
                        <a href="#" className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105 shadow-2xl shadow-orange-500/30">
                            Gabung Sekarang
                        </a>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <p className="text-slate-500">&copy; {new Date().getFullYear()} Pestaria. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {socialLinks.map(({ icon: Icon, href }, index) => (
                            <a key={index} href={href} className="text-slate-400 hover:text-white"><Icon /></a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

