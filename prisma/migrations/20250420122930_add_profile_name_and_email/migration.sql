/*
  Warnings:

  - Added the required column `providerEmail` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerName` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "providerEmail" TEXT NOT NULL,
ADD COLUMN     "providerName" TEXT NOT NULL;
