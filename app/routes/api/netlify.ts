import fs from "fs/promises";
import path from "path";

const NETLIFY_API = "https://api.netlify.com/api/v1";

export async function deployToNetlify(slug: string) {
  const token = process.env.NETLIFY_AUTH_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  if (!token || !siteId) throw new Error("Missing Netlify credentials");

  const filePath = path.join(process.cwd(), "output", slug, "index.html");
  const htmlContent = await fs.readFile(filePath, "utf8");

  const res = await fetch(`${NETLIFY_API}/sites/${siteId}/deploys`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/html",
    },
    body: htmlContent,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Deploy failed: ${err}`);
  }

  const data = await res.json();
  console.log("✅ Netlify Deploy:", data);
  return data;
}
