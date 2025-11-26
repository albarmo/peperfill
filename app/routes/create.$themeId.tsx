import { useState, useRef, useEffect } from "react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Smartphone,
  Monitor,
  Tablet,
  Eye,
  Edit,
  ChevronLeft,
  Music,
  Save,
  PanelLeftClose,
  File,
  Loader2,
  Copy,
  Check,
  QrCode, // Tambahkan ikon QrCode
} from "lucide-react";
import { themeRegistry } from "@/themes/registry";
import { DeviceFrame } from "@/ui/DeviceFrame";
import { InputFieldProps } from "@/ui/inputs/InputField";
import { TextareaFieldProps } from "@/ui/inputs/TextareaField";
import { ThemeToggleSwitch } from "@/ui/ThemeToggleSwitch";
import AudioSelectionModal from "@/ui/AudioSelectionModal";
import { QRCodeSVG } from "qrcode.react"; // Import QRCodeSVG
import ThemeSelectionModal from "./ThemeSelectionModal";

interface ThemeText {
  cover: {
    title: string;
    to: string;
    guest: string;
    button: string;
  };
  mainCover: {
    title: string;
  };
  intro: {
    basmalah: string;
    paragraph: string;
  };
  couple: {
    intro: string;
    brideFullName: string;
    brideParents: string;
    brideInstagram: string;
    groomFullName: string;
    groomParents: string;
    groomInstagram: string;
  };
  event: {
    title: string;
    akadTitle: string;
    akadIntro: string;
    akadDate: string;
    akadStartTime: string; // Changed from akadTime
    akadEndTime: string;   // New field for akad end time
    akadLocationIntro: string;
    akadLocation: string;
    akadAddress: string;
    receptionTitle: string;
    receptionIntro: string;
    receptionDate: string;
    receptionStartTime: string; // Changed from receptionTime
    receptionEndTime: string;   // New field for reception end time
    receptionLocationIntro: string;
    receptionLocation: string;
    receptionAddress: string;
  };
  loveStory: {
    title: string;
    subheading: string;
    [key: string]: string;
  };
  closing: {
    paragraph1: string;
    paragraph2: string;
  };
  [section: string]: {
    [key: string]: string;
  };
}

export interface ThemeConfig {
  name: string;
  displayName: string;
  previewUrl: string;
  audioUrl: string;
  backgrounds: {
    leftSide: string;
    cover: string;
    main: string;
    mainCover: string;
    countdown: string;
  };
  images: {
    bride: string;
    groom: string;
    closingCarousel: string[];
    gallery: string[];
  };
  text: ThemeText;
}

// Helper to format date to YYYY-MM-DD
const formatDateForInput = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch (e) {
    return dateString; // fallback to original value if parsing fails
  }
};

// Helper to format time to HH:mm
const formatTimeForInput = (timeString: string) => {
  if (typeof timeString !== "string") {
    return "";
  }
  const match = timeString.match(/(\d{2}[:.]\d{2})/);
  if (match && match[0]) {
    return match[0].replace(".", ":");
  }
  return timeString; // fallback to original value if parsing fails
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `Buat Undangan ${data?.theme.name || ""} | Pestaria` },
    {
      name: "description",
      content: `Buat undangan pernikahan digital Anda dengan tema ${data?.theme.name}.`,
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const themeId = params.themeId as keyof typeof themeRegistry;
  if (!themeId || !themeRegistry[themeId]) {
    throw new Response("Theme not found", { status: 404 });
  }
  const { component, ...theme } = themeRegistry[themeId];
  return json({ theme });
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: InputFieldProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 capitalize"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

const TextareaField = ({
  label,
  name,
  value,
  onChange,
}: TextareaFieldProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 capitalize"
    >
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      rows={3}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    ></textarea>
  </div>
);

const ImageUploadField = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const syntheticEvent = {
          target: { name, value: reader.result as string },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <img
          src={value}
          alt="Preview"
          className="w-16 h-16 object-cover rounded-md bg-gray-100 border"
        />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default function CreateInvitationPage() {
  const { theme } = useLoaderData<typeof loader>();
  const ThemeComponent =
    themeRegistry[theme.name.toLowerCase() as keyof typeof themeRegistry]
      .component;

  const [formData, setFormData] = useState<ThemeConfig>(
    theme.config as ThemeConfig
  );
  const [previewMode, setPreviewMode] = useState<
    "mobile" | "tablet" | "desktop"
  >("mobile");
  const [appearance, setAppearance] = useState<"light" | "dark">("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(
    null
  );
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<{
    url: string;
    slug: string;
    localPreviewUrl: string; // Tambahkan properti untuk URL preview lokal
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    updateFormData(keys, value);
  };

  const updateFormData = (keys: string[], value: string) => {
    setFormData((prev) => {
      const newState = { ...prev };
      let current: any = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const nextKey = keys[i + 1];
        const isNextKeyArrayIndex = !isNaN(parseInt(nextKey, 10));

        if (isNextKeyArrayIndex) {
          current[key] = [...current[key]];
        } else {
          current[key] = { ...current[key] };
        }
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;

      return newState as ThemeConfig;
    });
  };

  const handleDownloadHtml = async () => {
    console.log(theme.name)
    try {
      const response = await fetch("/api/render-html", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          themeName: theme.name,
          formData: formData,
        }),
      });

      console.log("response",response)

      if (!response.ok) {
        throw new Error("Gagal me-render HTML di server.");
      }

      const htmlContent = await response.text();
      const blob = new Blob([htmlContent], { type: "text/html" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `undangan-${formData.text.couple.brideFullName}-${formData.text.couple.groomFullName}.html`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error(err);
      alert("Gagal mengunduh undangan. Coba lagi.");
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishResult(null);
    try {
      const brideFirstName = formData.text.couple.brideFullName.split(" ")[0];
      const groomFirstName = formData.text.couple.groomFullName.split(" ")[0];
      const slug = `${brideFirstName}-${groomFirstName}`.toLowerCase();

      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: theme.name,
          data: formData,
          slug,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error);
      setPublishResult({
        url: result.siteUrl,
        slug: result.slug,
        localPreviewUrl: result.siteUrl,
      });
    } catch (err: any) {
      alert(`❌ Gagal publish: ${err.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  useEffect(() => {
    if (highlightedSection && formRef.current) {
      const element = formRef.current.querySelector(
        `[data-path="${highlightedSection}"]`
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [highlightedSection]);

  const renderFormSection = (
    sectionData: { [key: string]: string },
    parentKey: string
  ) => {
    return Object.entries(sectionData).map(([key, value]) => {
      const fieldName = `${parentKey}.${key}`;
      const label = key.replace(/([A-Z])/g, " $1").trim();

      if (typeof value === "string") {
        if (
          key.toLowerCase().includes("address") ||
          key.toLowerCase().includes("paragraph")
        ) {
          return (
            <TextareaField
              key={fieldName}
              label={label}
              name={fieldName}
              value={value}
              onChange={handleInputChange}
            />
          );
        }
        if (key.toLowerCase().includes("date")) {
          return (
            <InputField
              key={fieldName}
              label={label}
              name={fieldName}
              value={formatDateForInput(value)}
              onChange={handleInputChange}
              type="date"
            />
          );
        }
        if (key.toLowerCase().includes("time")) {
          return (
            <InputField
              key={fieldName}
              label={label}
              name={fieldName}
              value={formatTimeForInput(value)}
              onChange={handleInputChange}
              type="time"
            />
          );
        }
        // Handle start and end times for akad and reception events
        if (key.toLowerCase().includes("starttime") || key.toLowerCase().includes("endtime")) {
          return (
            <InputField
              key={fieldName}
              label={label}
              name={fieldName}
              value={formatTimeForInput(value)}
              onChange={handleInputChange}
              type="time"
            />
          );
        }
        return (
          <InputField
            key={fieldName}
            label={label}
            name={fieldName}
            value={value}
            onChange={handleInputChange}
          />
        );
      }
      return null;
    });
  };

  const renderImageInputs = (
    sectionData: { [key: string]: string | string[] },
    parentKey: string
  ) => {
    return Object.entries(sectionData).map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, " $1").trim();

      if (Array.isArray(value)) {
        return (
          <div
            key={`${parentKey}.${key}`}
            className="space-y-2 border-l-2 border-gray-200 pl-4 pt-2"
          >
            <h4 className="text-sm font-semibold text-gray-600 capitalize">
              {label}
            </h4>
            {value.map((item, index) => (
              <ImageUploadField
                key={`${parentKey}.${key}.${index}`}
                label={`${label} ${index + 1}`}
                name={`${parentKey}.${key}.${index}`}
                value={item}
                onChange={handleInputChange}
              />
            ))}
          </div>
        );
      }

      return (
        <ImageUploadField
          key={`${parentKey}.${key}`}
          label={label}
          name={`${parentKey}.${key}`}
          value={value}
          onChange={handleInputChange}
        />
      );
    });
  };

  return (
    <div className="md:h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <div
        className={`relative transition-all duration-300 ease-in-out bg-white border-r shadow-sm ${
          isSidebarOpen ? "w-full md:w-1/4" : "w-0"
        }`}
      >
        <div
          className={`h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-8 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 p-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Isi Detail Undangan
          </h2>
          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="w-full flex items-center justify-between p-3 mb-6 text-left bg-white border border-gray-200 rounded-lg hover:border-indigo-400 hover:shadow-sm transition-all"
          >
            <div>
              <span className="text-xs text-gray-500">Tema Saat Ini</span>
              <p className="font-semibold text-indigo-700">
                {theme.displayName}
              </p>
            </div>
            <Edit
              size={18}
              className="text-gray-400 group-hover:text-indigo-600"
            />
          </button>
          <form ref={formRef} className="space-y-6">
            {Object.entries(formData.text).map(([sectionKey, sectionValue]) => (
              <fieldset
                key={sectionKey}
                data-path={`text.${sectionKey}`}
                className={`border-t border-gray-200 pt-6 rounded-lg transition-all duration-300 ${
                  highlightedSection === `text.${sectionKey}`
                    ? "bg-indigo-50 ring-2 ring-indigo-200"
                    : ""
                }`}
              >
                <legend className="text-lg font-semibold text-gray-800 capitalize">
                  {sectionKey.replace(/([A-Z])/g, " $1")}
                </legend>
                <div className="space-y-4 mt-4">
                  {renderFormSection(sectionValue, `text.${sectionKey}`)}
                </div>
              </fieldset>
            ))}

            <fieldset
              key="audio"
              className="border-t border-gray-200 pt-6 rounded-lg"
            >
              <legend className="text-lg font-semibold text-gray-800">
                Audio
              </legend>
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between gap-4 bg-gray-50 p-3 rounded-md">
                  <p className="min-w-0 flex-1 text-sm text-gray-600 break-all">
                    {formData.audioUrl.split("/").pop()}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsAudioModalOpen(true)}
                    className="flex-shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <Music size={16} /> Ganti
                  </button>
                </div>
              </div>
            </fieldset>

            <fieldset
              key="backgrounds"
              data-path="backgrounds"
              className={`border-t border-gray-200 pt-6 rounded-lg transition-all duration-300 ${
                highlightedSection === `backgrounds`
                  ? "bg-indigo-50 ring-2 ring-indigo-200"
                  : ""
              }`}
            >
              <legend className="text-lg font-semibold text-gray-800">
                Backgrounds
              </legend>
              <div className="space-y-4 mt-4">
                {renderImageInputs(formData.backgrounds, "backgrounds")}
              </div>
            </fieldset>

            <fieldset
              key="images"
              data-path="images"
              className={`border-t border-gray-200 pt-6 rounded-lg transition-all duration-300 ${
                highlightedSection === `images`
                  ? "bg-indigo-50 ring-2 ring-indigo-200"
                  : ""
              }`}
            >
              <legend className="text-lg font-semibold text-gray-800">
                Images
              </legend>
              <div className="space-y-4 mt-4">
                {renderImageInputs(formData.images, "images")}
              </div>
            </fieldset>
          </form>
        </div>
      </div>

      <AudioSelectionModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        currentUrl={formData.audioUrl}
        onSelect={(url) => {
          updateFormData(["audioUrl"], url);
          setIsAudioModalOpen(false);
        }}
      />

      <ThemeSelectionModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentThemeName={theme.name}
      />

      {publishResult && (
        <PublishSuccessModal
          result={publishResult}
          onClose={() => setPublishResult(null)}
        />
      )}
      <div
        className={`bg-gray-200 flex flex-col items-center gap-4 h-screen relative transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-full md:w-3/4" : "w-full"
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-1/2 -translate-y-1/2 -left-4 z-20 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all text-gray-600 hover:text-indigo-600"
          title={isSidebarOpen ? "Sembunyikan Sidebar" : "Tampilkan Sidebar"}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5 -rotate-180" />
          )}
        </button>

        <div className="w-full z-10 flex items-center justify-between p-2 bg-white border-b border-gray-200 shadow-sm gap-4">
          <div className="flex items-center gap-4">
            <ThemeToggleSwitch
              appearance={appearance}
              onToggle={() =>
                setAppearance((prev) => (prev === "light" ? "dark" : "light"))
              }
            />

            <div className="w-px h-6 bg-gray-300" />

            <div className="bg-gray-100 p-1 rounded-full flex items-center space-x-1">
              {(
                [
                  ["mobile", <Smartphone className="w-5 h-5" />],
                  ["tablet", <Tablet className="w-5 h-5" />],
                  ["desktop", <Monitor className="w-5 h-5" />],
                ] as const
              ).map(([mode, icon]) => (
                <button
                  key={mode}
                  onClick={() => setPreviewMode(mode)}
                  className={`p-2 rounded-full transition-colors ${
                    previewMode === mode
                      ? "bg-white shadow text-indigo-600"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                  title={`Mode ${mode}`}
                >
                  {icon}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-gray-300" />

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`group flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                isEditing
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
              title="Mode Edit Langsung"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const previewData = {
                  theme: theme.name,
                  config: formData,
                  data: {
                    bride: formData.text.couple.brideFullName,
                    groom: formData.text.couple.groomFullName,
                    eventDate: formData.text.event.receptionDate,
                    location: formData.text.event.receptionLocation,
                    title: `The Wedding of ${formData.text.couple.brideFullName} & ${formData.text.couple.groomFullName}`,
                    slug: "preview",
                    description: formData.text.closing.paragraph1,
                  },
                };

                try {
                  const jsonString = JSON.stringify(previewData);
                  const encodedData = btoa(encodeURIComponent(jsonString));
                  window.open(`/preview/${encodedData}`, "_blank");
                } catch (error) {
                  console.error("Error creating preview:", error);
                  alert("Gagal membuat preview. Silakan coba lagi.");
                }
              }}
              className="group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-indigo-600 transition-colors"
              title="Lihat preview undangan"
            >
              <Eye className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-medium">Preview</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadHtml}
              className="group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
              title="Undangan akan di deploy dan dapat diakses oleh publik"
            >
              <File className="w-5 h-5" />
              <span className="text-sm font-medium">HTML</span>
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
              className="group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm disabled:bg-indigo-400 disabled:cursor-not-allowed"
              title="Undangan akan di deploy dan dapat diakses oleh publik"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-medium">Publishing...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span className="text-sm font-medium">Publish</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center w-full min-h-0 overflow-hidden">
          <DeviceFrame
            mode={previewMode}
            autoTheme={appearance}
            isEditing={isEditing}
            onUpdate={(path, value) => updateFormData(path.split("."), value)}
          >
            <ThemeComponent
              config={formData}
              isStatic={true}
              data={{
                bride: formData.text.couple.brideFullName,
                groom: formData.text.couple.groomFullName,
                eventDate: new Date(formData.text.event.receptionDate),
                title: `${formData.text.couple.brideFullName} & ${formData.text.couple.groomFullName}`,
                location: formData.text.event.receptionLocation,
                slug: "preview",
                description: formData.text.closing.paragraph1,
                config: formData,
              }}
            />
          </DeviceFrame>
        </div>
      </div>
    </div>
  );
}

function PublishSuccessModal({
  result,
  onClose,
}: { // Perbarui tipe properti result
  result: { url: string; slug: string; localPreviewUrl: string };
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md text-center p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={32} />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">
          Undangan Berhasil Dipublish!
        </h3>
        <p className="text-gray-500 mt-2 mb-6">
          Undangan Anda sekarang sudah aktif dan dapat diakses melalui link di
          bawah ini.
        </p>
        {/* Bagian QR Code */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-3">Scan untuk preview di perangkat mobile:</p>
          <div className="p-2 bg-white rounded-md shadow-inner">
            <QRCodeSVG
              value={result.localPreviewUrl}
              size={128}
            />
          </div>
          <p className="text-xs text-gray-500 mt-3 break-all">{result.localPreviewUrl}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between gap-4">
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-medium truncate hover:underline"
          >
            {result.url}
          </a>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 text-gray-500 hover:text-indigo-600"
            title="Salin URL"
          >
            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
