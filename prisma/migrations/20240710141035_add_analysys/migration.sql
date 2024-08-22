/*
  Warnings:

  - Added the required column `analysis` to the `ApplyHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplyHistory" ADD COLUMN     "analysis" JSONB NOT NULL;
