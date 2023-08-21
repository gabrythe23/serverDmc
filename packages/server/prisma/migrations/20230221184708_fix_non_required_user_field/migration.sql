/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "lastLogin" DROP NOT NULL;

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_feeId_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "feeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "Fee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
