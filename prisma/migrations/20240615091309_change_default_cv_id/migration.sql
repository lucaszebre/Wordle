/*
  Warnings:

  - You are about to drop the column `defaultCVId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "defaultCVId",
ADD COLUMN     "default_cv_id" TEXT;
