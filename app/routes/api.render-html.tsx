import React from "react";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { renderToString } from "react-dom/server";
import { themeRegistry } from "@/themes/registry";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import * as esbuild from "esbuild";

function getFontLinks() {
  return [
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Great+Vibes&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap",
  ];
}

export const action = async ({ request }: ActionFunctionArgs) => {
  let { themeName, formData } = await request.json();

  if (!themeName || !themeRegistry[themeName as keyof typeof themeRegistry]) {
    return json({ error: "Theme not found" }, { status: 400 });
  }

  // --- Fungsi untuk mengubah path gambar menjadi Base64 ---
  async function imagePathToBase64(filePath: string) {
    try {
      const absolutePath = path.join(process.cwd(), "public", filePath);
      const fileBuffer = await fs.readFile(absolutePath);
      const mimeType = `image/${path.extname(filePath).slice(1)}`;

      // Kompresi gambar menggunakan sharp
      const compressedBuffer = await sharp(fileBuffer)
        .resize({ width: 1200, withoutEnlargement: true }) // Resize jika terlalu besar
        .jpeg({ quality: 80 }) // Kompresi JPEG
        .png({ quality: 80 }) // Kompresi PNG
        .toBuffer();

      return `data:${mimeType};base64,${compressedBuffer.toString("base64")}`;
    } catch (error) {
      console.error(`Could not process image: ${filePath}`, error);
      return filePath; // Kembalikan path asli jika gagal
    }
  }

  // --- Rekursif mengubah semua path gambar di formData ---
  async function embedImagesInConfig(config: any): Promise<any> {
    if (typeof config !== "object" || config === null) {
      return config;
    }

    if (Array.isArray(config)) {
      return Promise.all(config.map(embedImagesInConfig));
    }

    const newConfig: { [key: string]: any } = {};
    for (const key in config) {
      const value = config[key];
      if (typeof value === "string" && /\.(png|jpe?g|gif|webp)$/i.test(value)) {
        newConfig[key] = await imagePathToBase64(value);
      } else {
        newConfig[key] = await embedImagesInConfig(value);
      }
    }
    return newConfig;
  }

  // --- Proses formData untuk menyematkan gambar ---
  formData = await embedImagesInConfig(formData);

  const ThemeComponent =
    themeRegistry[themeName as keyof typeof themeRegistry].component;

  // 1. Render HTML awal di server untuk hidrasi
  const themeHtml = renderToString(
    <ThemeComponent
      config={formData}
      data={{
        bride: formData.text.couple.brideFullName,
        groom: formData.text.couple.groomFullName,
        eventDate: new Date(formData.text.event.receptionDate),
        title: `The Wedding of ${formData.text.couple.brideFullName} & ${
          formData.text.couple.groomFullName
        }`,
        location: formData.text.event.receptionLocation,
        slug: "undangan",
        description: formData.text.closing.paragraph1,
        config: formData,
      }}
    />
  );

  // 2. Buat kode entrypoint untuk bundel JavaScript
  const entryPointCode = `
    import React from "react";
    import ReactDOM from "react-dom/client";
    import ThemeComponent from "./themes/${themeName.toLowerCase()}/index.tsx";

    const data = JSON.parse(document.getElementById("invitation-data").textContent);
    const props = { 
      config: data.formData, 
      data: { 
        bride: data.formData.text.couple.brideFullName,
        groom: data.formData.text.couple.groomFullName,
        eventDate: new Date(data.formData.text.event.receptionDate),
        title: "The Wedding of",
        location: data.formData.text.event.receptionLocation,
        slug: "undangan",
        description: data.formData.text.closing.paragraph1,
        config: data.formData,
      }
    };

    ReactDOM.hydrateRoot(
      document.getElementById('root'),
      React.createElement(ThemeComponent, props)
    );
  `;

  // 3. Gunakan esbuild untuk membundel JavaScript secara on-the-fly
  const bundleResult = await esbuild.build({
    stdin: {
      contents: entryPointCode,
      resolveDir: path.join(process.cwd(), "app"),
      loader: "tsx",
    },
    bundle: true,
    write: false, // Jangan tulis ke file, kembalikan sebagai string
    minify: true,
    format: "iife", // Format yang bisa langsung dieksekusi di browser
  });

  const bundledJs = bundleResult.outputFiles[0].text;

  const fontLinks = getFontLinks();

  // 4. Gabungkan semuanya menjadi satu file HTML
  const fullHtml = `
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Undangan Pernikahan ${formData.text.couple.brideFullName} & ${
    formData.text.couple.groomFullName
  }</title>
        <script src="https://cdn.tailwindcss.com"></script>
        ${fontLinks
          .map((link) => `<link href="${link}" rel="stylesheet">`)
          .join("\n")}
      </head>
      <body>
        <div id="root">${themeHtml}</div>
        <script id="invitation-data" type="application/json">${JSON.stringify({ formData })}</script>
        <script>${bundledJs}</script>
      </body>
    </html>
  `;

  return new Response(fullHtml, {
    headers: { "Content-Type": "text/html" },
  });
};