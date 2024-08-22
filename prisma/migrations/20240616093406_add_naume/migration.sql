/*
  Warnings:

  - Added the required column `name` to the `LetterModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LetterModel" ADD COLUMN     "name" TEXT NOT NULL;
