/*
  Warnings:

  - Made the column `appointment_date` on table `appointments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "appointment_date" SET NOT NULL;
