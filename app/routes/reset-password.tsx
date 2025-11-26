import type {
  MetaFunction,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { ArrowLeft } from "lucide-react";
import { resetPassword } from "./api/auth";
import { prisma } from "@/lib/db.server";

type ActionData = {
  error?: string;
};

type LoaderData = {
  error?: string;
  token?: string;
};

export const meta: MetaFunction = () => [
  { title: "Atur Ulang Kata Sandi - Pestaria" },
  {
    name: "description",
    content: "Buat kata sandi baru untuk akun Pestaria Anda.",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return json<LoaderData>(
      { error: "Tautan pengaturan ulang kata sandi tidak valid atau telah kedaluwarsa." },
      { status: 400 }
    );
  }

  const passwordReset = await prisma.passwordReset.findFirst({
    where: {
      token,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!passwordReset) {
    return json<LoaderData>(
      { error: "Tautan pengaturan ulang kata sandi tidak valid atau telah kedaluwarsa." },
      { status: 400 }
    );
  }

  return json<LoaderData>({ token });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const token = formData.get("token");

  if (
    typeof password !== "string" ||
    typeof confirmPassword !== "string" ||
    typeof token !== "string"
  ) {
    return json<ActionData>(
      { error: "Data yang dikirim tidak valid." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { error: "Kata sandi baru harus minimal 8 karakter." },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return json<ActionData>(
      { error: "Kata sandi dan konfirmasi kata sandi tidak cocok." },
      { status: 400 }
    );
  }

  try {
    await resetPassword({ token, newPassword: password });
    return redirect("/login?reset=success");
  } catch (error: any) {
    return json<ActionData>({ error: error.message }, { status: 400 });
  }
}

export default function ResetPasswordPage() {
  const loaderData = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (loaderData.error) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800 antialiased">
        <AuthNavbar />
        <main className="flex-grow flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Tautan Tidak Valid</h1>
            <p className="text-slate-600 mb-6">{loaderData.error}</p>
            <Link to="/forgot-password" className="text-sm font-medium text-orange-600 hover:text-orange-500">
              Minta tautan baru
            </Link>
          </div>
        </main>
        <AuthFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800 antialiased">
      <AuthNavbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-slate-900 mb-6">
            Atur Ulang Kata Sandi
          </h1>
          {actionData?.error && <Alert type="error" message={actionData.error} />}
          <Form method="post" className="space-y-6">
            <input type="hidden" name="token" value={loaderData.token} />
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Kata Sandi Baru
              </label>
              <input type="password" id="password" name="password" required minLength={8} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition" placeholder="Minimal 8 karakter" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
                Konfirmasi Kata Sandi Baru
              </label>
              <input type="password" id="confirmPassword" name="confirmPassword" required minLength={8} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition" placeholder="Ulangi kata sandi baru" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition disabled:bg-orange-300">
              {isSubmitting ? "Menyimpan..." : "Atur Ulang Kata Sandi"}
            </button>
          </Form>
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
        <p>&copy; {new Date().getFullYear()} Pestaria. Hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}

function Alert({ type, message }: { type: "error" | "success"; message: string }) {
  const baseStyle = "px-4 py-3 rounded relative mb-4 border text-sm font-medium";
  const styles = type === "error" ? "bg-red-100 border-red-400 text-red-700" : "bg-green-100 border-green-400 text-green-700";
  return (
    <div className={`${baseStyle} ${styles}`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
}