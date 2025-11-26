import React from "react";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { renderToString } from "react-dom/server";
import { themeRegistry } from "@/themes/registry";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import * as esbuild from "esbuild";
import archiver from "archiver";
import { minify } from "html-minifier-terser";

// ---------- Helpers ----------
function getFontLinks() {
  return [
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&family=Poppins:wght@300;400;500;600&display=swap",
  ];
}

async function imagePathToWebpBase64(filePath: string) {
  try {
    const abs = path.join(process.cwd(), "public", filePath);
    const buf = await fs.readFile(abs);
    const comp = await sharp(buf)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    return `data:image/webp;base64,${comp.toString("base64")}`;
  } catch {
    return filePath;
  }
}

async function embedImagesInConfig(config: any): Promise<any> {
  if (typeof config !== "object" || config === null) return config;
  if (Array.isArray(config)) return Promise.all(config.map(embedImagesInConfig));
  const result: Record<string, any> = {};
  for (const key in config) {
    const val = config[key];
    if (typeof val === "string" && /\.(png|jpe?g|gif|webp)$/i.test(val)) {
      result[key] = await imagePathToWebpBase64(val);
    } else {
      result[key] = await embedImagesInConfig(val);
    }
  }
  return result;
}

// ---------- Action ----------
export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { theme, data, slug } = await request.json();
    if (!theme || !data || !slug)
      return json({ error: "Missing required fields (theme, data, slug)" }, { status: 400 });

    const ThemeComponent =
      themeRegistry[theme.toLowerCase() as keyof typeof themeRegistry]?.component;
    if (!ThemeComponent)
      return json({ error: "Theme not found" }, { status: 404 });

    // 1️⃣ Embed gambar
    const formData = await embedImagesInConfig(data);

    // 2️⃣ SSR render
    const htmlSSR = renderToString(
      <ThemeComponent
        config={formData}
        data={{
          bride: formData.text.couple.brideFullName,
          groom: formData.text.couple.groomFullName,
          eventDate: new Date(formData.text.event.receptionDate),
          title: `The Wedding of ${formData.text.couple.brideFullName} & ${formData.text.couple.groomFullName}`,
          location: formData.text.event.receptionLocation,
          slug,
          description: formData.text.closing.paragraph1,
          config: formData,
        }}
      />
    );

    // 3️⃣ Client hydration bundle
    const entryCode = `
      import React from "react";
      import ReactDOM from "react-dom/client";
      import ThemeComponent from "./themes/${theme.toLowerCase()}/index.tsx";
      const data = JSON.parse(document.getElementById("invitation-data").textContent);
      const props = { 
        apiBaseUrl: data.apiBaseUrl,
        config: data.formData,
        data: { 
          bride: data.formData.text.couple.brideFullName,
          groom: data.formData.text.couple.groomFullName,
          eventDate: new Date(data.formData.text.event.receptionDate),
          title: "The Wedding of",
          location: data.formData.text.event.receptionLocation,
          slug: "${slug}",
          description: data.formData.text.closing.paragraph1,
          config: data.formData,
          apiBaseUrl: data.apiBaseUrl,
        }
      };
      ReactDOM.hydrateRoot(document.getElementById("root"), React.createElement(ThemeComponent, props));
    `;

    const bundle = await esbuild.build({
      stdin: { contents: entryCode, resolveDir: path.join(process.cwd(), "app"), loader: "tsx" },
      bundle: true,
      write: false,
      minify: true,
      format: "iife",
    });
    const bundledJs = bundle.outputFiles[0].text;

    // 4️⃣ HTML + minify
    const rawHtml = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Undangan ${formData.text.couple.brideFullName} & ${formData.text.couple.groomFullName}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        ${getFontLinks().map(l => `<link rel="stylesheet" href="${l}">`).join("\n")}
      </head>
      <body>
        <div id="root">${htmlSSR}</div>
        <script id="invitation-data" type="application/json">${JSON.stringify({ formData, apiBaseUrl: process.env.API_BASE_URL })}</script>
        <script defer>${bundledJs}</script>
      </body>
      </html>
    `;

    const fullHtml = await minify(rawHtml, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
    });

    // 5️⃣ ZIP hasil build
    const archive = archiver("zip", { zlib: { level: 9 } });
    const zipPromise = new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      archive.on("data", c => chunks.push(c));
      archive.on("end", () => resolve(Buffer.concat(chunks)));
      archive.on("error", reject);
    });

    // Header caching (1 tahun, immutable)
    const cacheBuster = Date.now();
    archive.append(fullHtml, { name: "index.html" });
    archive.append("/*    /index.html   200", { name: "_redirects" });
    archive.append(
      `/*\n  Cache-Control: public, max-age=31536000, immutable\n  X-Cache-Buster: ${cacheBuster}\n`,
      { name: "_headers" }
    );

    // Edge cache optional
    if (process.env.EDGE_CACHE_ENABLED === "true") {
      archive.append(
        `
        export default async (request, context) => {
          const key = new URL(request.url).pathname;
          const cache = await caches.open("edge-html-cache");
          const cached = await cache.match(key);
          if (cached) return cached;
          const resp = await context.next();
          if (resp.ok) cache.put(key, resp.clone());
          return resp;
        };
        `,
        { name: "_edge_functions/edge-cache.js" }
      );
      archive.append(`[build]\n  edge_functions = "_edge_functions"`, {
        name: "netlify.toml",
      });
    }

    archive.finalize();
    const zipBuffer = await zipPromise;

    // 6️⃣ Deploy ke site slug
    const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN!;
    const MAIN_SITE_ID = process.env.NETLIFY_MAIN_SITE_ID!;
    if (!NETLIFY_TOKEN) throw new Error("NETLIFY_AUTH_TOKEN belum di-set");
    if (!MAIN_SITE_ID) throw new Error("NETLIFY_MAIN_SITE_ID belum di-set");

    const slugSiteName = `invite-${slug}`;
    const slugSiteUrl = `https://${slugSiteName}.netlify.app`;

    // Cari / buat site slug
    const sitesRes = await fetch("https://api.netlify.com/api/v1/sites", {
      headers: { Authorization: `Bearer ${NETLIFY_TOKEN}` },
    });
    const sites = await sitesRes.json();
    let slugSiteId = sites.find((s: any) => s.name === slugSiteName)?.id;

    if (!slugSiteId) {
      const createRes = await fetch("https://api.netlify.com/api/v1/sites", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NETLIFY_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: slugSiteName }),
      });
      if (!createRes.ok) throw new Error("Gagal membuat site Netlify baru");
      const created = await createRes.json();
      slugSiteId = created.id;
    }

    // Deploy slug
    const deployRes = await fetch(
      `https://api.netlify.com/api/v1/sites/${slugSiteId}/deploys`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NETLIFY_TOKEN}`,
          "Content-Type": "application/zip",
        },
        body: zipBuffer as any,
      }
    );
    if (!deployRes.ok) throw new Error("Deploy site slug gagal");
    const deploy = await deployRes.json();

    // 7️⃣ Update redirect di main site
    const redirectRule = `/${slug}/*   ${slugSiteUrl}/:splat   200`;
    const latest = await fetch(
      `https://api.netlify.com/api/v1/sites/${MAIN_SITE_ID}/deploys?per_page=1`,
      { headers: { Authorization: `Bearer ${NETLIFY_TOKEN}` } }
    );

    let redirects = "";
    if (latest.ok) {
      const [d] = (await latest.json()) || [];
      if (d?.id) {
        const f = await fetch(
          `https://api.netlify.com/api/v1/deploys/${d.id}/files/_redirects`,
          { headers: { Authorization: `Bearer ${NETLIFY_TOKEN}` } }
        );
        if (f.ok) redirects = await f.text();
      }
    }

    if (!redirects.includes(redirectRule)) {
      redirects += (redirects ? "\n" : "") + redirectRule + "\n/*    /index.html   200\n";

      const redirectArchive = archiver("zip", { zlib: { level: 9 } });
      const redirectZipPromise = new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        redirectArchive.on("data", (c) => chunks.push(c));
        redirectArchive.on("end", () => resolve(Buffer.concat(chunks)));
        redirectArchive.on("error", reject);
      });
      redirectArchive.append(redirects, { name: "_redirects" });
      redirectArchive.finalize();
      const redirectZip = await redirectZipPromise;

      await fetch(`https://api.netlify.com/api/v1/sites/${MAIN_SITE_ID}/deploys`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NETLIFY_TOKEN}`,
          "Content-Type": "application/zip",
        },
        body: redirectZip as any,
      });
    }

    // 8️⃣ Purge Edge Cache otomatis (jika aktif)
    if (process.env.EDGE_CACHE_ENABLED === "true") {
      try {
        const purgeRes = await fetch(
          `https://api.netlify.com/api/v1/sites/${slugSiteId}/edge_functions/purge`,
          { method: "POST", headers: { Authorization: `Bearer ${NETLIFY_TOKEN}` } }
        );
        if (purgeRes.ok) console.log(`♻️ Edge cache purged for ${slug}`);
        else console.warn(`⚠️ Purge gagal untuk ${slug}`);
      } catch (e) {
        console.warn("Edge cache purge skipped:", e);
      }
    }

    return json({
      success: true,
      slug,
      siteUrl: slugSiteUrl,
      mainUrl: `https://invite.albaryulia.site/${slug}`,
      edgeCacheEnabled: process.env.EDGE_CACHE_ENABLED === "true",
      deploy,
    });
  } catch (err: any) {
    console.error("❌ Publish Error:", err);
    return json({ error: err.message }, { status: 500 });
  }
};