import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.info("🌱 Start seeding...");

  // === USERS ===
  const passwordHash = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "albar@example.com" },
    update: {},
    create: {
      name: "Albar",
      email: "albar@example.com",
      phone: "+6281111111111",
      password: passwordHash,
      role: "admin",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "raya@example.com" },
    update: {},
    create: {
      name: "Raya",
      email: "raya@example.com",
      phone: "+6281222222222",
      password: passwordHash,
      role: "user",
    },
  });

  // === CATEGORIES ===
  const categories = await prisma.category.createMany({
    data: [
      { name: "classic", description: "Tema klasik dan elegan" },
      { name: "modern", description: "Tema modern dan minimalis" },
    ],
    skipDuplicates: true,
  });

  // === TAGS ===
  const tags = await prisma.tag.createMany({
    data: [
      { name: "floral" },
      { name: "minimalist" },
      { name: "luxury" },
    ],
    skipDuplicates: true,
  });

  // === THEMES ===
  const floral = await prisma.theme.upsert({
    where: { name: "floral" },
    update: {},
    create: {
      name: "floral",
      label: "Floral",
      previewUrl: "/images/floral.png",
      price: 150000,
      activeMonths: 6,
    },
  });

  const elegant = await prisma.theme.upsert({
    where: { name: "elegant" },
    update: {},
    create: {
      name: "elegant",
      label: "Elegant",
      previewUrl: "/images/elegant.png",
      price: 200000,
      activeMonths: 12,
    },
  });

  const minimalist = await prisma.theme.upsert({
    where: { name: "minimalist" },
    update: {},
    create: {
      name: "minimalist",
      label: "Minimalist",
      previewUrl: "/images/minimalist.png",
      price: 100000,
      activeMonths: 3,
    },
  });

  // === INVITATIONS ===
  await prisma.invitation.createMany({
    data: [
      {
        title: "Pernikahan Ayu & Budi",
        bride: "Ayu",
        groom: "Budi",
        slug: "ayu-budi",
        description: "Undangan pernikahan spesial kami.",
        eventDate: new Date("2025-12-25T10:00:00Z"),
        location: "Gedung Serbaguna Jakarta",
        themeId: floral.id,
        creatorId: admin.id,
        url: "https://pestaria.com/ayu-budi",
      },
      {
        title: "Pernikahan Dinda & Reza",
        bride: "Dinda",
        groom: "Reza",
        slug: "dinda-reza",
        description: "Kami mengundang Anda di hari bahagia kami.",
        eventDate: new Date("2026-01-15T16:00:00Z"),
        location: "Hotel Elegant Bandung",
        themeId: elegant.id,
        creatorId: user.id,
        url: "https://pestaria.com/dinda-reza",
      },
    ],
    skipDuplicates: true,
  });

  // === CART & WISHLIST ===
  await prisma.cartItem.createMany({
    data: [
      { userId: user.id, themeId: floral.id, quantity: 1 },
      { userId: user.id, themeId: minimalist.id, quantity: 2 },
    ],
    skipDuplicates: true,
  });

  await prisma.wishlistItem.createMany({
    data: [
      { userId: admin.id, themeId: elegant.id },
      { userId: admin.id, themeId: floral.id },
    ],
    skipDuplicates: true,
  });

  // === TRANSACTIONS ===
  await prisma.transaction.create({
    data: {
      userId: user.id,
      items: [
        { themeId: floral.id, quantity: 1, price: 150000 },
        { themeId: elegant.id, quantity: 1, price: 200000 },
      ],
      totalAmount: 350000,
      status: "paid",
      paymentMethod: "bank_transfer",
      paidAt: new Date(),
      paidBy: "Raya",
    },
  });

  console.info("✅ Seeding complete!");
}

main()
  .catch((err) => {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
