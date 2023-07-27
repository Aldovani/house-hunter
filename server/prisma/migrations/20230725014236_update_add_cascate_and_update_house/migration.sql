/*
  Warnings:

  - Made the column `longitude` on table `houses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `houses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `houses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `houses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `houses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `district` on table `houses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address_number` on table `houses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_house_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_category_id_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_house_id_fkey";

-- DropForeignKey
ALTER TABLE "house_images" DROP CONSTRAINT "house_images_house_id_fkey";

-- DropForeignKey
ALTER TABLE "house_rooms" DROP CONSTRAINT "house_rooms_house_id_fkey";

-- DropForeignKey
ALTER TABLE "house_rooms" DROP CONSTRAINT "house_rooms_room_id_fkey";

-- DropForeignKey
ALTER TABLE "houses" DROP CONSTRAINT "houses_owner_id_fkey";

-- AlterTable
ALTER TABLE "houses" ALTER COLUMN "longitude" SET NOT NULL,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "district" SET NOT NULL,
ALTER COLUMN "address_number" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house_images" ADD CONSTRAINT "house_images_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house_rooms" ADD CONSTRAINT "house_rooms_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house_rooms" ADD CONSTRAINT "house_rooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
