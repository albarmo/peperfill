import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { Instagram, Twitter, Facebook, Lock, ArrowLeft } from "lucide-react";

interface Theme {
  name: string;
  price: number;
}

interface Coupon {
  code: string;
  discount: number;
  type: "fixed" | "percentage";
}

interface Addon {
  id: string;
  name: string;
  price: number;
}

const themesData: Record<string, Theme> = {
  syari: { name: "Tema Syari Modern", price: 149000 },
  "modern-vibe": { name: "Tema Modern Vibe", price: 299000 },
  default: { name: "Tema Pilihan", price: 149000 },
};

const couponsData: Record<string, Coupon> = {
  SY50: { code: "SY50", discount: 50000, type: "fixed" },
  PESTARIA10: { code: "PESTARIA10", discount: 10, type: "percentage" },
};

const addonsData: Addon[] = [
  { id: "terima-beres-3x24", name: "Terima Beres 3x24 Jam", price: 30000 },
  { id: "terima-beres-express-1x24", name: "Terima Beres Express 1x24 Jam", price: 50000 },
  { id: "qr-checkin", name: "QR Checkin", price: 150000 },
  { id: "custom-domain-myid", name: "Custom Domain (my.id)", price: 100000 },
  { id: "custom-domain-com", name: "Custom Domain (.com)", price: 250000 },
  { id: "lifetime", name: "Masa Aktif Lifetime/Selamanya", price: 100000 },
  { id: "whatsapp-blast", name: "Whatsapp Blast", price: 150000 },
];

export const meta: MetaFunction = () => [
  { title: "Checkout - Pestaria" },
  { name: "description", content: "Selesaikan pesanan undangan digital Anda di Pestaria." },
];

export async function loader({ params, request }: LoaderFunctionArgs) {
  const themeSlug = params.themeSlug || "default";
  const url = new URL(request.url);
  const couponCode = url.searchParams.get("coupon");

  const theme = themesData[themeSlug] || themesData["default"];
  const coupon = couponCode ? couponsData[couponCode.toUpperCase()] || null : null;

  return json({ theme, coupon, availableAddons: addonsData });
}

export default function CheckoutPage() {
  const { theme, coupon: initialCoupon, availableAddons } = useLoaderData<typeof loader>();

  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(initialCoupon);
  const [couponInput, setCouponInput] = useState(initialCoupon?.code || "");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("bca");
  const [couponStatus, setCouponStatus] = useState<{ type: "success" | "error" | "idle"; message: string }>(() => {
    return initialCoupon ? { type: "success", message: "Kupon dari link berhasil diterapkan!" } : { type: "idle", message: "" };
  });

  const handleAddonChange = (addon: Addon, isChecked: boolean) => {
    setSelectedAddons(prev => (isChecked ? [...prev, addon] : prev.filter(a => a.id !== addon.id)));
  };

  const handleApplyCoupon = () => {
    const newCoupon = couponsData[couponInput.toUpperCase()] || null;
    if (newCoupon) {
      setCoupon(newCoupon);
      setCouponStatus({ type: "success", message: "Kupon berhasil diterapkan!" });
    } else {
      setCoupon(null);
      setCouponStatus({ type: "error", message: "Kode kupon tidak valid." });
    }
  };

  return (
    <div className="bg-slate-100 font-sans text-slate-800 antialiased min-h-screen flex flex-col">
      <CheckoutNavbar />

      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <CheckoutForm
            availableAddons={availableAddons}
            selectedAddons={selectedAddons}
            onAddonChange={handleAddonChange}
            selectedPayment={selectedPayment}
            onPaymentChange={setSelectedPayment}
            termsAccepted={termsAccepted}
            onTermsChange={setTermsAccepted}
          />
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <OrderSummary
            theme={theme}
            selectedAddons={selectedAddons}
            coupon={coupon}
            couponInput={couponInput}
            setCouponInput={setCouponInput}
            handleApplyCoupon={handleApplyCoupon}
            couponStatus={couponStatus}
            termsAccepted={termsAccepted}
          />
        </div>
      </div>

      <CheckoutFooter />
    </div>
  );
}

function CheckoutNavbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <a href="/">
         <img src="/logo-pestaria.png" alt="Logo Pestaria" className="h-32 w-auto" />
        </a>
        <a href="/" className="flex items-center gap-2 text-slate-600 hover:text-orange-500 transition-colors">
          <ArrowLeft size={16} /> Kembali ke Beranda
        </a>
      </div>
    </header>
  );
}

function CheckoutFooter() {
  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
  ];
  return (
    <footer className="bg-slate-200 text-slate-600">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} Pestaria. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {socialLinks.map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} className="hover:text-slate-800">
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

interface CheckoutFormProps {
  availableAddons: Addon[];
  selectedAddons: Addon[];
  onAddonChange: (addon: Addon, isChecked: boolean) => void;
  selectedPayment: string;
  onPaymentChange: (value: string) => void;
  termsAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
}

function CheckoutForm({
  availableAddons,
  selectedAddons,
  onAddonChange,
  selectedPayment,
  onPaymentChange,
  termsAccepted,
  onTermsChange,
}: CheckoutFormProps) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
      <FormSection title="Rincian Kontak">
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField label="Nama Lengkap" id="full-name" placeholder="John Doe" required />
          <InputField label="Nomor WhatsApp" id="whatsapp" placeholder="081234567890" required />
        </div>
        <InputField label="Alamat Email" id="email" placeholder="kamu@email.com" type="email" required />
      </FormSection>

      <FormSection title="Addon">
        <div className="grid sm:grid-cols-2 gap-4">
          {availableAddons.map((addon) => {
            const isSelected = selectedAddons.some((a) => a.id === addon.id);
            return (
              <label
                key={addon.id}
                className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer transition-all
                  ${isSelected ? "bg-yellow-50 border-orange-500" : "border-slate-300 hover:border-orange-400"}`}
              >
                <div>
                  <p className="font-semibold">{addon.name}</p>
                  <p className="text-sm text-slate-500">{formatCurrency(addon.price)}</p>
                </div>
                <input
                  type="checkbox"
                  className="h-5 w-5 text-orange-600 border-gray-300 rounded"
                  checked={isSelected}
                  onChange={(e) => onAddonChange(addon, e.target.checked)}
                />
              </label>
            );
          })}
        </div>
      </FormSection>

      <FormSection title="Metode Pembayaran">
        <div className="grid sm:grid-cols-2 gap-4">
          <PaymentOption
            id="bca"
            value="bca"
            logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia_logo.svg/2560px-Bank_Central_Asia_logo.svg.png"
            alt="BCA"
            selectedPayment={selectedPayment}
            onChange={onPaymentChange}
          />
          <PaymentOption
            id="va"
            value="va"
            logo=""
            alt="Virtual Account"
            selectedPayment={selectedPayment}
            onChange={onPaymentChange}
          />
        </div>
      </FormSection>

      <div className="pt-6 border-t border-slate-200 space-y-4">
        <label htmlFor="terms" className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => onTermsChange(e.target.checked)}
            className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 mt-1 flex-shrink-0"
          />
          <span className="text-sm">
            YA, Saya telah membaca dan menyetujui{" "}
            <a href="/syarat-ketentuan" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline font-semibold">
              syarat & ketentuan
            </a>
            .
          </span>
        </label>
        <div className="text-sm text-slate-500 flex items-center gap-2">
          <Lock size={16} /> Informasi Anda aman bersama kami.
        </div>
      </div>
    </div>
  );
}
interface OrderSummaryProps {
  theme: Theme;
  selectedAddons: Addon[];
  coupon: Coupon | null;
  couponInput: string;
  setCouponInput: (value: string) => void;
  handleApplyCoupon: () => void;
  couponStatus: { type: "success" | "error" | "idle"; message: string };
  termsAccepted: boolean;
}

function OrderSummary({
  theme,
  selectedAddons,
  coupon,
  couponInput,
  setCouponInput,
  handleApplyCoupon,
  couponStatus,
  termsAccepted,
}: OrderSummaryProps) {
  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const subtotal = theme.price + addonsTotal;

  let discountAmount = 0;
  if (coupon) discountAmount = coupon.type === "fixed" ? coupon.discount : (subtotal * coupon.discount) / 100;
  const total = Math.max(0, subtotal - discountAmount);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg sticky top-28">
      <h2 className="text-2xl font-bold border-b border-slate-200 pb-4">Rincian Pesanan</h2>

      <div className="space-y-4 py-6 border-b border-slate-200">
        <div className="flex justify-between">
          <p className="text-slate-600">{theme.name}</p>
          <p className="font-semibold">{formatCurrency(theme.price)}</p>
        </div>
        {selectedAddons.map((addon) => (
          <div key={addon.id} className="flex justify-between text-sm text-slate-500">
            <p>{addon.name}</p>
            <p className="font-medium text-slate-600">{formatCurrency(addon.price)}</p>
          </div>
        ))}
      </div>

      <div className="py-6 border-b border-slate-200">
        <label className="font-semibold text-slate-700 mb-2 block">Kode Kupon</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Masukkan kode kupon"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="flex-grow w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <button onClick={handleApplyCoupon} className="bg-slate-200 px-4 py-2 rounded-lg font-semibold hover:bg-slate-300">
            Terapkan
          </button>
        </div>
        {couponStatus.type === "success" && <p className="text-sm text-green-600 mt-2">{couponStatus.message}</p>}
        {couponStatus.type === "error" && <p className="text-sm text-red-600 mt-2">{couponStatus.message}</p>}
      </div>

      <div className="space-y-4 py-6">
        <div className="flex justify-between">
          <p className="text-slate-600">Subtotal</p>
          <p className="font-semibold">{formatCurrency(subtotal)}</p>
        </div>
        {coupon && (
          <div className="flex justify-between text-green-600">
            <p>Diskon ({coupon.code})</p>
            <p className="font-semibold">- {formatCurrency(discountAmount)}</p>
          </div>
        )}
        <div className="flex justify-between text-2xl font-bold text-slate-900">
          <p>Total</p>
          <p>{formatCurrency(total)}</p>
        </div>
      </div>

      <button
        disabled={!termsAccepted}
        className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold shadow-lg disabled:bg-slate-400 disabled:shadow-none transition hover:bg-orange-600"
      >
        Proses Pembayaran
      </button>
    </div>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
}

function InputField({ label, id, ...props }: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 font-semibold">{label}</label>
      <input id={id} {...props} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition" />
    </div>
  );
}

function PaymentOption({
  id,
  value,
  logo,
  alt,
  selectedPayment,
  onChange,
}: {
  id: string;
  value: string;
  logo: string;
  alt: string;
  selectedPayment: string;
  onChange: (value: string) => void;
}) {
  const isSelected = selectedPayment === value;
  return (
    <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${isSelected ? "border-orange-500 bg-yellow-50" : "border-slate-300 border-dashed hover:border-orange-400"}`}>
      <input type="radio" id={id} name="payment" value={value} checked={isSelected} onChange={(e) => onChange(e.target.value)} className="h-5 w-5 text-orange-600 focus:ring-orange-500 border-slate-400" />
      {logo ? <img src={logo} alt={alt} className="h-6" /> : <span className="font-semibold">{alt}</span>}
    </label>
  );
}
