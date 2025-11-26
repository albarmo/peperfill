/*
  Warnings:

  - You are about to drop the column `email` on the `Guest` table. All the data in the column will be lost.
  - Made the column `themeId` on table `Invitation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `themeId` on table `InvitationVersion` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Invitation" DROP CONSTRAINT "Invitation_themeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."InvitationVersion" DROP CONSTRAINT "InvitationVersion_themeId_fkey";

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "email",
ADD COLUMN     "guestCount" INTEGER DEFAULT 1,
ADD COLUMN     "message" TEXT;

-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "themeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "InvitationVersion" ALTER COLUMN "themeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationVersion" ADD CONSTRAINT "InvitationVersion_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
