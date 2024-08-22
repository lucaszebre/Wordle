/*
  Warnings:

  - The `template` column on the `ApplyHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ApplyHistory" DROP COLUMN "template",
ADD COLUMN     "template" JSONB[];
