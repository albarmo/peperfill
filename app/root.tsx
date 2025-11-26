import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import appStylesHref from "./app.css?url";

import InviteLayout from "./ui/layouts/InviteLayout";
import MainLayout from "./ui/layouts/MainLayout";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400;1,700&family=Great+Vibes&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const host = url.hostname;
  const to = url.searchParams.get("to");
  
  const subdomain = host.startsWith("invite.") ? "invite" : "main";

  return { to, subdomain };
}

export default function App() {
  const { subdomain } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        {subdomain === "invite" ? <InviteLayout /> : <MainLayout />}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}