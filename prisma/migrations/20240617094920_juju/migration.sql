/*
  Warnings:

  - You are about to drop the column `content` on the `LetterModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LetterModel" DROP COLUMN "content",
ADD COLUMN     "sections" JSONB;
