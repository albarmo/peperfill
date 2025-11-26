import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import Navbar from "@/ui/layouts/Navbar";
import Footer from "@/ui/layouts/Footer";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { CardTheme } from "../ui/CardTheme";
import { getFilteredThemes } from "./api/themes";

export const meta: MetaFunction = () => {
  return [
    { title: "Pilih Tema - Pestaria" },
    {
      name: "description",
      content:
        "Jelajahi berbagai pilihan tema undangan digital premium dari Pestaria. Temukan desain yang sempurna untuk momen spesial Anda.",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  const category = url.searchParams.get("category");

  const { themes, categories } = await getFilteredThemes({ query, category });

  return json({
    themes,
    categories,
    query,
    activeCategory: category || "Semua",
  });
};

export default function ThemesPage() {
  const { themes, categories, query, activeCategory } =
    useLoaderData<typeof loader>();
  const submit = useSubmit();

  const allCategories = [{ name: "Semua" }, ...categories];

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = query || "";
    }
  }, [query]);

  function handleFormChange(event: React.FormEvent<HTMLFormElement>) {
    submit(event.currentTarget, { replace: true });
  }
  return (
    <div className="bg-slate-50 font-sans text-slate-800 antialiased">
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-100/50 to-transparent z-0"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                Pilih Tema Impianmu
              </h1>
              <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
                Temukan desain yang paling cocok untuk acaramu dari koleksi
                premium kami.
              </p>
            </div>
          </div>
        </section>

        {/* Theme List */}
        <div className="container mx-auto px-6 pb-24">
          {/* Filter and Search Section */}
          <div className="mx-auto mt-12">
            <Form
              method="get"
              onChange={handleFormChange}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-grow">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  id="q"
                  type="text"
                  name="q"
                  defaultValue={query || ""}
                  placeholder="Cari nama tema..."
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </Form>
            <div className="mt-4 flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <Link
                  key={cat.name}
                  to={`?${new URLSearchParams({
                    q: query || "",
                    category: cat.name,
                  }).toString()}`}
                  preventScrollReset
                  className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                    activeCategory === cat.name
                      ? "bg-slate-800 text-white font-semibold shadow"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          {themes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-12">
              {themes.map((theme) => (
                <CardTheme
                  key={theme.id}
                  theme={theme}
                  formatCurrency={formatCurrency}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-500">
                Belum ada tema untuk ditampilkan.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
