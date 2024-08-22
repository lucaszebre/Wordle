/*
  Warnings:

  - Added the required column `representation` to the `LetterModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LetterModel" ADD COLUMN     "representation" JSONB NOT NULL;
