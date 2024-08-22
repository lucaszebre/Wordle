/*
  Warnings:

  - Added the required column `tokenAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplyHistory" ADD COLUMN     "tokensCost" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "description" TEXT,
ADD COLUMN     "tokenAmount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TokenPurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripeSessionId" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "TokenPurchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TokenPurchase" ADD CONSTRAINT "TokenPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
