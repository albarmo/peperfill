import type { MetaFunction, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Form, useActionData, useLoaderData } from "@remix-run/react";
import { ArrowLeft } from "lucide-react";
import { json, redirect, createCookie } from "@remix-run/node";
import { login } from "./api/auth";

const sessionCookie = createCookie("session", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7,
});

export const meta: MetaFunction = () => {
  return [
    { title: "Masuk - Pestaria" },
    {
      name: "description",
      content: "Masuk ke akun Pestaria Anda untuk mengelola undangan digital.",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const registered = url.searchParams.get("registered");
  const reset = url.searchParams.get("reset");
  const forgotPasswordSent = url.searchParams.get("forgot_password");

  let successMessage: string | null = null;
  if (registered) successMessage = "Registrasi berhasil! Silakan masuk ke akun Anda.";
  if (reset === "success") successMessage = "Kata sandi berhasil diatur ulang! Silakan masuk dengan kata sandi baru Anda.";
  if (forgotPasswordSent === "sent") successMessage = "Instruksi untuk mengatur ulang kata sandi telah dikirim ke email Anda.";


  return json({ successMessage });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return json({ error: "Email dan Password harus diisi." }, { status: 400 });
  }

  let token: string;
  try {
    token = await login({ email, password });
  } catch (error: any) {
    return json(
      { error: error.message || "Terjadi kesalahan saat login." },
      { status: 401 }
    );
  }

  return redirect("/dashboard", {
    headers: { "Set-Cookie": await sessionCookie.serialize(token) },
  });
}

export default function LoginPage() {
  const { successMessage } = useLoaderData<typeof loader>();
  return (
    <div className="bg-slate-100 font-sans text-slate-800 antialiased min-h-screen flex flex-col">
      <AuthNavbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-slate-900 mb-8">
            Masuk ke Akun Anda
          </h1>
          {successMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-sm"
              role="alert"
            >
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          <Form method="post" className="space-y-6">
            {useActionData<typeof action>()?.error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">
                  {useActionData<typeof action>()?.error}
                </span>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                placeholder="********"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-slate-900"
                >
                  Ingat saya
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-orange-600 hover:text-orange-500"
              >
                Lupa Kata Sandi?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition"
            >
              Masuk
            </button>
          </Form>
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Daftar Sekarang
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
          <img
            src="/logo-pestaria.png"
            alt="Logo Pestaria"
            className="h-32 w-auto"
          />
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-600 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft size={16} /> Kembali ke Beranda
        </Link>
      </div>
    </header>
  );
}

function AuthFooter() {
  return (
    <footer className="bg-slate-200 text-slate-600">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} Pestaria. All rights reserved.</p>
      </div>
    </footer>
  );
}
