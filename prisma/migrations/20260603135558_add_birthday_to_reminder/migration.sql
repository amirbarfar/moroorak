-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "birthDate" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'reminder';
