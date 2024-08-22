/*
  Warnings:

  - Added the required column `lastUpdated` to the `CVInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CVInfo" ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL;
