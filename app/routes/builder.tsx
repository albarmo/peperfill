import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getAllThemes } from "@/routes/api/themes";
import { formatDate } from "@/lib/utils";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export const loader: LoaderFunction = async () => {
  const themes = await getAllThemes();
  return json({ themes });
};

export default function BuilderIndex() {
  const { themes } = useLoaderData<typeof loader>();
  return (
    <main className="p-6 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          🎨 Pilih Tema Undangan
        </h1>
        <Link
          to="/builder/new"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition"
        >
          + Buat Undangan Baru
        </Link>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {themes.map(
          (theme: {
            label: ReactNode;
            id: Key | null | undefined;
            primaryColor: any;
            secondaryColor: any;
            name:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            isDefault: any;
            fontFamily:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
          }) => (
            <Link
              key={theme.id}
              to={`/create/${theme.name}`}
              className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <div
                className="h-40 w-full"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                }}
              ></div>
              <div className="p-4">
                <h2 className="text-lg font-semibold group-hover:text-blue-600">
                  {theme.label}
                </h2>
                {theme.isDefault && (
                  <span className="text-xs text-green-500 font-medium">
                    Default
                  </span>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Font: {theme.fontFamily}
                </p>
              </div>
            </Link>
          )
        )}
      </section>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        © {formatDate(new Date()).split(" ")[2]} Pestaria Builder
      </footer>
    </main>
  );
}
