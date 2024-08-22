/*
  Warnings:

  - You are about to drop the column `modelContent` on the `LetterModel` table. All the data in the column will be lost.
  - You are about to drop the column `representation` on the `LetterModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LetterModel" DROP COLUMN "modelContent",
DROP COLUMN "representation",
ADD COLUMN     "content" TEXT;
