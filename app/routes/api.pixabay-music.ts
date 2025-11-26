// app/routes/api.freesound.ts
import { json, type LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "wedding";

  const apiKey = process.env.FREESOUND_API_KEY;

  if (!apiKey) {
    return json({ error: "Freesound API key not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(query)}&fields=id,name,previews,username&token=${apiKey}`
    );

    if (!res.ok) {
      throw new Error(`Freesound API responded with status: ${res.status}`);
    }

    const data = await res.json();
    // data.results akan berisi array sound
    return json({ hits: data.results });
  } catch (error) {
    console.error("Freesound API error:", error);
    return json({ error: "Failed to fetch from Freesound" }, { status: 502 });
  }
};
