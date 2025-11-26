import { LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData, Form } from "@remix-run/react";
import { formatDate } from "@/lib/utils";
import { getAllInvitations, deleteInvitation } from "../api/invitations";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export const loader: LoaderFunction = async () => {
  const invitations = await getAllInvitations();
  return json({ invitations });
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const slug = formData.get("slug") as string;

  if (slug) {
    await deleteInvitation(slug);
  }

  return null;
};

export default function DashboardPage() {
  const { invitations } = useLoaderData<typeof loader>();

  return (
    <main className="p-6 md:p-10 max-w-6xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            📋 Dashboard Undangan
          </h1>
          <p className="text-gray-500 mt-1">
            Kelola semua undangan digital kamu di sini.
          </p>
        </div>

        <Link
          to="/builder"
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition"
        >
          + Buat Undangan Baru
        </Link>
      </header>

      {invitations.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <p className="text-lg">Belum ada undangan yang dibuat 😢</p>
          <p className="text-sm mt-2">
            Yuk, mulai buat undangan pertamamu lewat{" "}
            <Link to="/builder" className="text-blue-600 hover:underline">
              Theme Builder
            </Link>
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {invitations.map(
            (invitation: {
              id: Key | null | undefined;
              theme: { primaryColor: any; secondaryColor: any };
              title:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
              bride:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
              groom:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
              eventDate: string | Date;
              slug: string | number | readonly string[] | undefined;
            }) => (
              <div
                key={invitation.id}
                className="group border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div
                  className="h-40 w-full bg-gradient-to-br"
                  style={{
                    background: `linear-gradient(135deg, ${
                      invitation.theme?.primaryColor || "#a78bfa"
                    }, ${invitation.theme?.secondaryColor || "#fbcfe8"})`,
                  }}
                ></div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {invitation.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {invitation.bride} & {invitation.groom}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {formatDate(invitation.eventDate)}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <Link
                      to={`/${invitation.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      🔗 Lihat
                    </Link>

                    <Form method="post">
                      <input
                        type="hidden"
                        name="slug"
                        value={invitation.slug}
                      />
                      <button
                        type="submit"
                        className="text-red-500 hover:text-red-600 text-sm font-medium"
                      >
                        Hapus
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            )
          )}
        </section>
      )}
    </main>
  );
}
