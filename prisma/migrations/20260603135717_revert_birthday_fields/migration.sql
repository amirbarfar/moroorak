/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Reminder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "birthDate",
DROP COLUMN "type";
