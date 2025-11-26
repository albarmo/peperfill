import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "@/lib/db.server";
import themeComponents from "@/themes/index";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  if (!url.hostname.startsWith("invite.")) {
    throw new Response("Not Found", { status: 404 });
  }

  const invitation = await prisma.invitation.findUnique({
    where: { slug: params.slug! },
    include: {
      theme: true,
      guests: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!invitation) {
    // If not found, try to find it on the main domain.
    // This is a fallback for development or direct access.
    throw new Response("Not Found", { status: 404 });
  }

  return json({ invitation, apiBaseUrl: process.env.API_BASE_URL });
}

export default function InvitationPage() {
  const { invitation, apiBaseUrl } = useLoaderData<typeof loader>();

  console.log("invitation", invitation)

  if (!invitation?.theme?.name) {
    return <div>Error: Tema untuk undangan ini tidak ditemukan.</div>;
  }

  const ThemeComponent =
    themeComponents[invitation.theme.name as keyof typeof themeComponents];
  
  console.log("themeComponents",themeComponents)

  if (!ThemeComponent) {
    return (
      <div>Error: Komponen tema "{invitation.theme.name}" tidak tersedia.</div>
    );
  }

  return (
    <ThemeComponent data={{
      ...invitation,
      apiBaseUrl,
      eventDate: new Date(invitation.eventDate),
      // @ts-ignore
      config: invitation.configData,
    }} />
  );
}
