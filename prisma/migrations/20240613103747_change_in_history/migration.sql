/*
  Warnings:

  - You are about to drop the column `parentId` on the `ApplyHistory` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ApplyHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ApplyHistory" DROP CONSTRAINT "ApplyHistory_parentId_fkey";

-- AlterTable
ALTER TABLE "ApplyHistory" DROP COLUMN "parentId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "ApplyHistory" ADD CONSTRAINT "ApplyHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
