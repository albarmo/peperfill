import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { EditableContext, EditableContextType } from "./Editable";

interface DeviceFrameProps {
  mode?: "mobile" | "tablet" | "desktop";
  themeStyle?: "auto" | "light" | "dark";
  glareIntensity?: "subtle" | "medium" | "strong";
  children: React.ReactNode;
  fontFamily?: string;
  autoTheme?: "light" | "dark";
  isEditing?: boolean;
  onUpdate?: (path: string, value: string) => void;
  onHighlightSection?: (path: string | null) => void;
  highlightedSection?: string | null;
}

export function DeviceFrame({
  mode = "mobile",
  themeStyle = "auto",
  glareIntensity = "strong",
  children,
  autoTheme = "light",
  isEditing = false,
  onUpdate = () => {},
  onHighlightSection = () => {},
  highlightedSection = null,
}: DeviceFrameProps) {
  const devicePresets = {
    mobile: { width: 390, height: 844, border: 16, radius: "2rem" },
    tablet: { width: 834, height: 1112, border: 24, radius: "1.5rem" },
    desktop: { width: 1280, height: 800, border: 0, radius: "1rem" },
  };

  const device = devicePresets[mode];
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);

  // Auto scale agar device fit di parent container
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const padding = 32; // lebih tipis
      const totalWidth = device.width + device.border * 2 + padding * 2;
      const totalHeight = device.height + device.border * 2 + padding * 2;
      const scaleX = clientWidth / totalWidth;
      const scaleY = clientHeight / totalHeight;
      setScale(Math.min(scaleX, scaleY, 1));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [mode]);

  // Inject iframe content + font
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const renderContent = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      // Hanya tulis ulang struktur HTML jika iframe kosong
      if (doc.body.innerHTML === "") {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                html, body, #app { margin: 0; padding: 0; width: 100%; height: 100%; font-family: "inherit"; background: ${autoTheme === "dark" ? "#1a1a1a" : "#fff"}; overflow: hidden; }
                * { box-sizing: border-box; }
              </style>
            </head>
            <body><div id="app"></div></body>
          </html>
        `);
        doc.close();

        // Clone font dari parent
        Array.from(document.querySelectorAll("link[rel='stylesheet']"))
          .filter(
            (link) =>
              link.href.includes("fonts.googleapis.com") ||
              link.href.includes("fonts.gstatic.com")
          )
          .forEach((fontLink) => {
            doc.head.appendChild(fontLink.cloneNode(true));
          });
      }

      // Render children ke dalam #app
      const mountNode = doc.getElementById("app");
      if (mountNode) {
        import("react-dom/client").then(({ createRoot }) => {
          createRoot(mountNode).render(
            <EditableContext.Provider value={{
              isEditing,
              onUpdate,
            } as EditableContextType}>
              <div className="h-full w-full">{children}</div>
            </EditableContext.Provider>
          );
        });
      }
    };

    // Panggil renderContent saat iframe selesai dimuat
    iframe.addEventListener("load", renderContent);

    // Jika iframe sudah dimuat sebelumnya, panggil renderContent secara manual
    if (iframe.contentDocument?.readyState === "complete") {
      renderContent();
    }

    return () => {
      iframe.removeEventListener("load", renderContent);
    };
  }, [children, mode, autoTheme, isEditing, onUpdate, highlightedSection]);

  const activeTheme = themeStyle === "auto" ? autoTheme : themeStyle ?? "light";

  const frameStyle =
    activeTheme === "light"
      ? `bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 border border-gray-200 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]`
      : `bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 border border-gray-700 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]`;

  const glareSettings = {
    subtle: { opacity: 0.08, height: "30%" },
    medium: { opacity: 0.15, height: "45%" },
    strong: { opacity: 0.25, height: "60%" },
  }[glareIntensity];

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full flex justify-center items-center  overflow-hidden perspective-[1200px]"
      )}
    >
      <div
        className="relative flex justify-center items-center transition-all duration-700 ease-in-out"
        style={{
          transform: `scale(${scale}) rotateX(3deg) rotateY(-4deg)`,
          width: device.width + device.border * 2,
          height: device.height + device.border * 2,
          willChange: "transform, width, height",
        }}
      >
        <div
          className={`relative flex items-center justify-center rounded-[2rem] ${frameStyle}`}
          style={{
            width: device.width + device.border * 2,
            height: device.height + device.border * 2,
            borderRadius: device.radius,
          }}
        >
          {/* Reflection / glare */}
          <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-black/5 to-transparent pointer-events-none mix-blend-overlay"></div>

          {/* Screen */}
          <div
            className="overflow-hidden relative"
            style={{
              width: device.width,
              height: device.height,
              borderRadius: `calc(${device.radius} - 0.5rem)`,
              background: activeTheme === "dark" ? "#111" : "#fff",
            }}
          >
            <iframe
              ref={iframeRef}
              title="Device Preview"
              className="w-full h-full border-none rounded-[inherit]"
            />

            {/* Glare overlay */}
            <div
              className="absolute top-0 left-0 w-full pointer-events-none"
              style={{
                height: glareSettings.height,
                background: `linear-gradient(to bottom, rgba(255,255,255,${glareSettings.opacity}) 0%, rgba(255,255,255,0) 100%)`,
                mixBlendMode: "screen",
              }}
            ></div>
          </div>

          {/* Side buttons */}
          {mode === "mobile" && (
            <>
              <div
                className={`absolute -left-[3px] top-[20%] w-[2px] h-[60px] rounded-full ${
                  activeTheme === "light" ? "bg-gray-300/80" : "bg-gray-600/70"
                }`}
              />
              <div
                className={`absolute -left-[3px] top-[30%] w-[2px] h-[80px] rounded-full ${
                  activeTheme === "light" ? "bg-gray-300/80" : "bg-gray-600/70"
                }`}
              />
              <div
                className={`absolute -right-[3px] top-[25%] w-[2px] h-[80px] rounded-full ${
                  activeTheme === "light" ? "bg-gray-300/80" : "bg-gray-600/70"
                }`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
