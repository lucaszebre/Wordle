/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `CVInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "defaultCVId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CVInfo_userId_key" ON "CVInfo"("userId");
