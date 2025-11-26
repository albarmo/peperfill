import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Navbar from "@/ui/layouts/Navbar";
import Footer from "@/ui/layouts/Footer";
import { Eye } from "lucide-react";
import { getAllInvitations } from "./api/invitations";

export const meta: MetaFunction = () => {
  return [
    { title: "Portofolio - Pestaria" },
    { name: "description", content: "Lihat koleksi undangan digital yang telah dibuat oleh komunitas bahagia kami." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const invitations = await getAllInvitations();
  const url = new URL(request.url);
  const inviteHostname = url.hostname.startsWith("localhost")
    ? `invite.${url.hostname}`
    : `invite.${url.hostname.split(".").slice(-2).join(".")}`;

  const inviteBaseUrl = `${url.protocol}//${inviteHostname}:${url.port}`;
  return json({ invitations, inviteBaseUrl });
};

export default function PortfolioPage() {
  const { invitations, inviteBaseUrl } = useLoaderData<typeof loader>();

  return (
    <div className="bg-slate-50 font-sans text-slate-800 antialiased">
      <Navbar />
      <main className="pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Portofolio Kami
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Inspirasi dari momen-momen bahagia yang telah dibagikan melalui Pestaria.
            </p>
          </div>

          {invitations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {invitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[9/16] w-full bg-yellow-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={invitation.theme?.previewUrl || `https://picsum.photos/seed/${invitation.id}/400/600`}
                      alt={`Preview for ${invitation.title}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                     <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="font-bold text-xl drop-shadow-md truncate">
                          {invitation.bride} & {invitation.groom}
                        </h3>
                        <p className="text-xs drop-shadow-md truncate">{invitation.title}</p>
                     </div>
                  </div>
                  <div className="p-4">
                    <a
                      href={`${inviteBaseUrl}/${invitation.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center bg-orange-500 text-white px-3 py-2 rounded-md font-semibold text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye size={16} /> Lihat Undangan
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-500">Belum ada portofolio untuk ditampilkan.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}