-- DropForeignKey
ALTER TABLE "LetterModel" DROP CONSTRAINT "LetterModel_userId_fkey";

-- AlterTable
ALTER TABLE "LetterModel" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "LetterModel" ADD CONSTRAINT "LetterModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
