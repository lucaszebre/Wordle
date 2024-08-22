/*
  Warnings:

  - Added the required column `description` to the `CVInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CVInfo" ADD COLUMN     "description" TEXT NOT NULL;
