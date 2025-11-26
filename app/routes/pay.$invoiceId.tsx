import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { Copy, Sun } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: `Invoice Pembayaran - Pestaria` },
    { name: "description", content: "Lakukan pembayaran untuk pesanan Pestaria Anda." },
  ];
};

const mockInvoices: { [key: string]: any } = {
    'INV2025101801609': {
      id: '#INV/20251018/01609',
      issueFor: 'Albar Moerhamsa',
      issueForEmail: 'moerhamsa@gmail.com',
      productName: 'Syari',
      productPrice: 158000,
      subtotal: 158000,
      uniqueCode: -47,
      discount: -79000,
      total: 78953,
      paymentMethod: 'Bank Transfer',
      paymentDetails: {
        accountNumber: '8880455282',
        accountName: 'BCA (IM Fadli)',
      },
      status: 'Pembayaran Tertunda'
    },
    'INV2025101801608': {
      id: '#INV/20251018/01608',
      issueFor: 'Albar Moerhamsa',
      issueForEmail: 'moerhamsa@gmail.com',
      productName: 'Syari',
      productPrice: 158000,
      subtotal: 158000,
      uniqueCode: 0,
      discount: -79000,
      total: 79000,
      paymentMethod: 'Virtual Account',
      paymentDetails: {
        provider: 'Xendit',
      },
      status: 'Pembayaran Tertunda'
    }
  };
export default function PaymentPage() {
  const [invoice, setInvoice] = useState<any | null>(null);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const invoiceId = pathParts[pathParts.length - 1];
    const foundInvoice = mockInvoices[invoiceId] || mockInvoices['INV2025101801609'];
    setInvoice(foundInvoice);
  }, []);
  
  if (!invoice) {
    return (
        <div className="bg-slate-100 min-h-screen font-sans flex items-center justify-center">
            <p className="text-lg text-slate-600">Loading invoice...</p>
        </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      <header className="bg-white shadow-sm">
         <div className="container mx-auto px-6 flex justify-between items-center">
            <img src="/logo-pestaria.png" alt="Logo Pestaria" height={100} width={120} className="object-contain" />
            <button className="text-slate-500 hover:text-orange-500">
              <Sun size={24} />
            </button>
         </div>
      </header>
      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          <InvoiceDetails invoice={invoice} />
          <OrderDetails invoice={invoice} />
        </div>
      </main>
    </div>
  );
}

function InvoiceDetails({ invoice }: { invoice: any }) {
    const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    return (
        <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold text-slate-800">Invoice {invoice.id}</h1>
            
            <div className="grid grid-cols-2 gap-8 mt-6 text-sm">
                <div>
                    <p className="text-slate-500">Tanggal Terbit:</p>
                    <p className="font-semibold text-slate-700">18 Oktober 2025 - 11:56</p>
                </div>
                <div>
                    <p className="text-slate-500">Tenggat Waktu:</p>
                    <p className="font-semibold text-slate-700">21 Oktober 2025 - 11:56</p>
                </div>
                 <div>
                    <p className="text-slate-500">Issue For:</p>
                    <p className="font-semibold text-slate-700">{invoice.issueFor}</p>
                    <p className="text-slate-500">{invoice.issueForEmail}</p>
                </div>
                 <div>
                    <p className="text-slate-500">Issue By:</p>
                    <p className="font-semibold text-slate-700">Pestaria</p>
                    <p className="text-slate-500">hello@pestaria.com</p>
                </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
                <div className="flex justify-between items-center text-slate-500 font-semibold mb-4">
                    <span>Produk</span>
                    <span>Harga</span>
                </div>
                <div className="flex justify-between items-center font-bold text-slate-800">
                    <span>{invoice.productName}</span>
                    <span>{formatCurrency(invoice.productPrice)}</span>
                </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-semibold text-slate-700">{formatCurrency(invoice.subtotal)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-slate-500">Kode Unik</span>
                    <span className="font-semibold text-slate-700">{formatCurrency(invoice.uniqueCode)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-slate-500">Diskon</span>
                    <span className="font-semibold text-red-500">{formatCurrency(invoice.discount)}</span>
                </div>
                 <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                    <span className="text-lg font-bold text-slate-800">Total</span>
                    <span className="text-xl font-bold text-orange-500">{formatCurrency(invoice.total)}</span>
                </div>
            </div>
        </div>
    );
}

function OrderDetails({ invoice }: { invoice: any }) {
    return (
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-600">Status:</span>
                <span className="bg-yellow-100 text-yellow-700 font-bold text-sm px-3 py-1 rounded-full">{invoice.status}</span>
            </div>

            <div className="mt-8">
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">DETAIL PESANAN</h3>
                <div className="space-y-2 text-sm">
                    <DetailRow label="Tipe Membership" value="Member" />
                    <DetailRow label="Masa Aktif Akun" value="1 Year" />
                    <DetailRow label="Masa Aktif Undangan" value="1 Year" />
                    <DetailRow label="Kuota Undangan" value="1" />
                    <DetailRow label="Harga Perpanjang" value="Rp 79.000" />
                </div>
            </div>
            
            <div className="mt-8">
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">METODE PEMBAYARAN</h3>
                {invoice.paymentMethod === 'Bank Transfer' ? (
                    <BankTransferDetails details={invoice.paymentDetails} />
                ) : (
                    <VirtualAccountDetails details={invoice.paymentDetails} />
                )}
            </div>
        </div>
    );
}

function DetailRow({ label, value }: { label: string, value: string | number }) {
    return (
        <div className="flex justify-between">
            <span className="text-slate-500">{label}:</span>
            <span className="font-semibold text-slate-700">{value}</span>
        </div>
    );
}

function BankTransferDetails({ details }: { details: any }) {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(details.accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-3 text-sm">
            <DetailRow label="Metode Pembayaran" value="Bank Transfer" />
            <div>
                <p className="text-slate-500">Instruksi Pembayaran:</p>
                <p className="font-semibold text-slate-700">Transfer pembayaran Anda ke salah satu rekening bank di bawah ini:</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                <div>
                    <p className="font-bold text-lg text-slate-800">{details.accountNumber}</p>
                    <p className="text-slate-500">{details.accountName}</p>
                </div>
                <button onClick={handleCopy} className="text-slate-500 hover:text-orange-500">
                    {copied ? <span className="text-xs text-green-500">Tersalin!</span> : <Copy size={20} />}
                </button>
            </div>
            <button className="w-full mt-4 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors">
                KONFIRMASI PEMBAYARAN
            </button>
        </div>
    );
}

function VirtualAccountDetails({ details }: { details: any }) {
    return (
        <div className="space-y-3 text-sm">
            <DetailRow label="Metode Pembayaran" value={details.provider} />
            <div>
                <p className="text-slate-500">Instruksi Pembayaran:</p>
                <p className="font-semibold text-slate-700">Pembayaran otomatis dengan virtual akun, qris, atau retail.</p>
            </div>
            <button className="w-full mt-4 bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-900 transition-colors">
                BAYAR SEKARANG
            </button>
        </div>
    );
}

