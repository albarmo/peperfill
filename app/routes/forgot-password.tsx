import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { ArrowLeft } from "lucide-react";
import { json, redirect } from "@remix-run/node";
import { forgotPassword } from "./api/auth";

type ActionData = {
  error?: string;
  success?: string;
};

export const meta: MetaFunction = () => [
  { title: "Lupa Kata Sandi - Pestaria" },
  {
    name: "description",
    content: "Atur ulang kata sandi akun Pestaria Anda dengan cepat dan aman.",
  },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    return json<ActionData>(
      { error: "Mohon masukkan alamat email yang valid." },
      { status: 400 }
    );
  }

  try {
    await forgotPassword({ email });
  } catch (error: unknown) {
    console.error(`[ForgotPassword] ${(error as Error).message}`);
  }

  return redirect("/login?forgot_password=sent");
}

export default function ForgotPasswordPage() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800 antialiased">
      <AuthNavbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
            Lupa Kata Sandi?
          </h1>
          <p className="text-center text-slate-600 mb-8 text-sm leading-relaxed">
            Masukkan alamat email yang terdaftar di akun Anda. Kami akan
            mengirimkan tautan untuk mengatur ulang kata sandi Anda.
          </p>

          {actionData?.error && <Alert type="error" message={actionData.error} />}

          <Form method="post" className="space-y-6" aria-label="Formulir lupa kata sandi">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                placeholder="nama@contoh.com"
                aria-invalid={Boolean(actionData?.error) || undefined}
                aria-describedby={actionData?.error ? "email-error" : undefined}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition disabled:bg-orange-300"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Tautan Reset"}
            </button>
          </Form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-orange-600 hover:text-orange-500 flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft size={16} /> Kembali ke Halaman Masuk
            </Link>
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
        <Link to="/" aria-label="Kembali ke beranda Pestaria">
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
      <div className="container mx-auto px-6 py-8 flex justify-center items-center text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <strong>Pestaria</strong>. Semua hak
          cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}

function Alert({
  type,
  message,
}: {
  type: "error" | "success";
  message: string;
}) {
  const baseStyle =
    "px-4 py-3 rounded relative mb-4 border text-sm font-medium";
  const styles =
    type === "error"
      ? "bg-red-100 border-red-400 text-red-700"
      : "bg-green-100 border-green-400 text-green-700";

  return (
    <div className={`${baseStyle} ${styles}`} role="alert" id="email-error">
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
