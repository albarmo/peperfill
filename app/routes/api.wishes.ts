import { prisma } from "@/lib/db.server";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
} from "@remix-run/node";

/**
 * Loader function to handle GET requests to /api/wishes.
 * Fetches all wishes (guests with messages) from the database.
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Handle preflight request (important for CORS)
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(request.url);
    const invitationId = url.searchParams.get("invitationId");

    if (!invitationId) {
      return json(
        { error: "invitationId is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const wishes = await prisma.guest.findMany({
      where: {
        invitationId: invitationId,
        message: {
          not: null,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        message: true,
      },
    });

    return json(wishes, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch wishes:", error);
    return json(
      { error: "Could not load wishes", err: error },
      { status: 500, headers: corsHeaders }
    );
  }
};

/**
 * Action function to handle POST requests to /api/wishes.
 * This reuses the logic from your existing /api/rsvp route.
 */
export { action } from "./api.rsvp";
