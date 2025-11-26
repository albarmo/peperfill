-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bride" TEXT NOT NULL,
    "groom" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "themeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "previewUrl" TEXT,
    "category" TEXT,
    "styles" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_slug_key" ON "Invitation"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_name_key" ON "Theme"("name");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
