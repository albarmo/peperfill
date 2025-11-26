import { prisma } from "@/lib/db.server";
import { ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Handle preflight request
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const { name, message, status, guests, invitationId } =
      await request.json();

    const newRsvp = await prisma.guest.create({
      data: {
        name,
        message,
        status,
        guestCount: guests,
        invitationId,
      },
    });

    return json({ success: true, rsvp: newRsvp }, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("RSVP submission error:", error);
    return json(
      { success: false, error: "Failed to submit RSVP", err: error },
      { status: 500, headers: corsHeaders }
    );
  }
};
