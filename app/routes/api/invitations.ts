import { prisma } from "../../lib/db.server";
import { slugify, randomId } from "../../lib/utils";

export async function getInvitationBySlug(slug: string) {
  return prisma.invitation.findUnique({
    where: { slug },
    include: { theme: true },
  });
}

export async function getAllInvitations() {
  return prisma.invitation.findMany({
    orderBy: { createdAt: "desc" },
    include: { theme: true },
  });
}

export async function createInvitation({
  title,
  bride,
  groom,
  eventDate,
  themeId,
}: {
  title: string;
  bride: string;
  groom: string;
  eventDate: Date | string;
  themeId?: string;
}) {
  const slug = slugify(`${bride}-${groom}-${randomId(4)}`);

  return prisma.invitation.create({
    data: {
      title,
      bride,
      groom,
      eventDate: new Date(eventDate),
      slug,
      themeId,
    },
  });
}

export async function updateInvitation(slug: string, data: Partial<{
  title: string;
  bride: string;
  groom: string;
  eventDate: Date | string;
  themeId: string;
}>) {
  return prisma.invitation.update({
    where: { slug },
    data,
  });
}

export async function deleteInvitation(slug: string) {
  return prisma.invitation.delete({
    where: { slug },
  });
}
