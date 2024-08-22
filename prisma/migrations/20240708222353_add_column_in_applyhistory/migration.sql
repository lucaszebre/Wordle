/*
  Warnings:

  - Added the required column `Cv` to the `ApplyHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobsInfo` to the `ApplyHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `template` to the `ApplyHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplyHistory" ADD COLUMN     "CompanyInfo" TEXT,
ADD COLUMN     "Cv" JSONB NOT NULL,
ADD COLUMN     "extraInfo" TEXT,
ADD COLUMN     "jobsInfo" TEXT NOT NULL,
ADD COLUMN     "template" JSONB NOT NULL;
