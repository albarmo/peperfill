/*
  Warnings:

  - You are about to drop the column `category` on the `Theme` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "configData" JSONB,
ADD COLUMN     "creatorId" TEXT NOT NULL DEFAULT 'admin-uuid',
ADD COLUMN     "expiredAt" TIMESTAMP(3),
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "Theme" DROP COLUMN "category",
ADD COLUMN     "activeMonths" INTEGER,
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordReset" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordReset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProvider" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThemeTag" (
    "themeId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ThemeTag_pkey" PRIMARY KEY ("themeId","tagId")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentMethod" TEXT,
    "paymentExpiredAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "paidBy" TEXT,
    "transactionData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvitationVersion" (
    "id" TEXT NOT NULL,
    "invitationId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "bride" TEXT NOT NULL,
    "groom" TEXT NOT NULL,
    "description" TEXT,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "themeId" TEXT,
    "configData" JSONB,
    "staticHtml" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvitationVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "invitationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "invitationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "PasswordReset" ADD CONSTRAINT "PasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProvider" ADD CONSTRAINT "UserProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThemeTag" ADD CONSTRAINT "ThemeTag_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThemeTag" ADD CONSTRAINT "ThemeTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationVersion" ADD CONSTRAINT "InvitationVersion_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationVersion" ADD CONSTRAINT "InvitationVersion_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
