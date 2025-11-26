import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { Link, Form, useActionData } from "@remix-run/react";
import { ArrowLeft } from "lucide-react";
import { json, redirect } from "@remix-run/node";
import { register } from "./api/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "Daftar - Pestaria" },
    { name: "description", content: "Buat akun baru di Pestaria untuk mulai membuat undangan digital Anda." },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const termsAccepted = formData.get("terms") === "on";

  if (!name || !email || !password) {
    return json({ error: "Nama, Email, dan Password harus diisi." }, { status: 400 });
  }

  if (!termsAccepted) {
    return json({ error: "Anda harus menyetujui Syarat & Ketentuan." }, { status: 400 });
  }

  try {
    await register({ name, email, password });
    return redirect("/login?registered=true");
  } catch (error: any) {
    return json(
      { error: error.message || "Terjadi kesalahan saat mendaftar." },
      { status: 400 }
    );
  }
}

export default function RegisterPage() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="bg-slate-100 font-sans text-slate-800 antialiased min-h-screen flex flex-col">
      <AuthNavbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-slate-900 mb-8">Buat Akun Baru</h1>
          <Form method="post" className="space-y-6">
            {actionData?.error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{actionData.error}</span>
              </div>
            )}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                placeholder="contoh@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                placeholder="Minimal 8 karakter"
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-slate-600">
                  Saya setuju dengan{" "}
                  <Link to="/syarat-dan-ketentuan" className="font-medium text-orange-600 hover:text-orange-500" target="_blank">
                    Syarat & Ketentuan
                  </Link>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition"
            >
              Daftar
            </button>
          </Form>
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Sudah punya akun?{" "}
              <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}

function AuthNavbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link to="/">
          <img src="/logo-pestaria.png" alt="Logo Pestaria" className="h-32 w-auto" />
        </Link>
        <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-orange-500 transition-colors">
          <ArrowLeft size={16} /> Kembali ke Beranda
        </Link>
      </div>
    </header>
  );
}

function AuthFooter() {
  return (
    <footer className="bg-slate-200 text-slate-600">
      <div className="container mx-auto px-6 py-8 flex justify-center items-center text-center">
        <p>&copy; {new Date().getFullYear()} Pestaria. All rights reserved.</p>
      </div>
    </footer>
  );
}