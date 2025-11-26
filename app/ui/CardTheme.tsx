import { getFilteredThemes } from "@/routes/api/themes";
import { themeRegistry } from "@/themes/registry";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Eye, ShoppingCart } from "lucide-react";

type Theme = Awaited<ReturnType<typeof getFilteredThemes>>["themes"][number];

type CardThemeProps = {
  theme: Theme;
  formatCurrency: (amount: number) => string;
};


export function CardTheme({ theme, formatCurrency }: CardThemeProps) {
  console.log(theme)

  const handlePreview = () => {
    const config = theme.styles;

    if (!config) {
      alert("Konfigurasi pratinjau untuk tema ini tidak tersedia.");
      return;
    }

    const previewData = {
      theme: theme.name,
      config: config,
      data: {
        // Assuming config has a structure similar to ThemeConfig
        bride: (config as any)?.text?.couple?.brideFullName || "Bride",
        groom: (config as any)?.text?.couple?.groomFullName || "Groom",
        eventDate:
          (config as any)?.text?.event?.receptionDate ||
          new Date().toISOString().split("T")[0],
        location: (config as any)?.text?.event?.receptionLocation || "Location",
        title: `The Wedding of ${
          (config as any)?.text?.couple?.brideFullName || "Bride"
        } & ${(config as any)?.text?.couple?.groomFullName || "Groom"}`,
        slug: "preview",
        description:
          (config as any)?.text?.closing?.paragraph1 || "Preview Description",
      },
    };

    try {
      const jsonString = JSON.stringify(previewData);
      const encodedData = btoa(encodeURIComponent(jsonString));
      window.open(`/preview/${encodedData}`, "_blank");
    } catch (error) {
      console.error("Gagal membuat data pratinjau:", error);
      alert("Gagal membuat pratinjau. Silakan coba lagi.");
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[9/16] w-full bg-yellow-100 flex items-center justify-center overflow-hidden">
        <img
          src={
            theme.previewUrl || `https://picsum.photos/seed/${theme.id}/400/600`
          }
          alt={`Preview for ${theme.label}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-slate-800 text-base leading-tight">
            {theme.label}
          </h3>
          <span className="text-sm font-bold text-orange-500 whitespace-nowrap">
            {formatCurrency(Number(theme?.price))}
          </span>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
          <button
            onClick={handlePreview}
            className="flex-1 text-center bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-md font-semibold text-xs hover:bg-slate-100 hover:border-slate-300 transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye size={16} /> Preview
          </button>
          <Link
            to={`/checkout/${theme.name}`}
            className="flex-1 text-center bg-orange-500 text-white px-3 py-1.5 rounded-md font-semibold text-xs hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingCart size={16} /> Pesan
          </Link>
        </div>
      </div>
    </div>
  );
}
