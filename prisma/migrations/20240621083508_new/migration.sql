/*
  Warnings:

  - Added the required column `company` to the `ApplyHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ApplyHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplyHistory" ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
