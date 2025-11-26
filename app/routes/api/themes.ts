import { prisma } from "@/lib/db.server";

export type ThemePreset = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: string;
  isDefault?: boolean;
};

export async function getThemeBySlug(slug: string) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: { theme: true },
  });

  return invitation
}

export async function setThemeForInvitation(slug: string, themeId: string) {
  return await prisma.invitation.update({
    where: { slug },
    data: { themeId },
  });
}


export async function getAllThemes() {
  return await prisma.theme.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getFilteredThemes({
  query,
  category,
}: {
  query?: string | null;
  category?: string | null;
}) {
  const where: any = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { label: { contains: query, mode: "insensitive" } },
    ];
  }

  if (category && category !== "Semua") {
    where.category = { name: category };
  }

  const themes = await prisma.theme.findMany({ where, orderBy: { createdAt: "desc" } });
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return { themes, categories };
}
