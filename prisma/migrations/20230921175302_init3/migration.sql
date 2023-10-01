/*
  Warnings:

  - You are about to drop the column `last_active` on the `station_version` table. All the data in the column will be lost.
  - You are about to drop the column `last_message` on the `station_version` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `station` will be added. If there are existing duplicate values, this will fail.
  - Made the column `latest_version` on table `recipe` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `station_version` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "batch_progress" DROP CONSTRAINT "batch_progress_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "container_version" DROP CONSTRAINT "container_version_container_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_version" DROP CONSTRAINT "recipe_version_recipe_id_fkey";

-- DropIndex
DROP INDEX "station_version_mqtt_id_key";

-- AlterTable
ALTER TABLE "container" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "recipe" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "latest_version" SET NOT NULL;

-- AlterTable
ALTER TABLE "station" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "latest_version" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "station_version" DROP COLUMN "last_active",
DROP COLUMN "last_message",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "station_name_key" ON "station"("name");

-- AddForeignKey
ALTER TABLE "batch_progress" ADD CONSTRAINT "batch_progress_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "container_version" ADD CONSTRAINT "container_version_container_id_fkey" FOREIGN KEY ("container_id") REFERENCES "container"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_version" ADD CONSTRAINT "recipe_version_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "station_version" ADD CONSTRAINT "station_version_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
