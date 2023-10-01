/*
  Warnings:

  - You are about to drop the column `container_capacity` on the `batch` table. All the data in the column will be lost.
  - You are about to drop the column `container_id` on the `batch` table. All the data in the column will be lost.
  - You are about to drop the column `container_rfid` on the `batch` table. All the data in the column will be lost.
  - You are about to drop the column `recipe_id` on the `batch` table. All the data in the column will be lost.
  - You are about to drop the column `recipe_ingredients` on the `batch` table. All the data in the column will be lost.
  - You are about to drop the column `recipe_name` on the `batch` table. All the data in the column will be lost.
  - You are about to drop the column `recipe_notes` on the `batch` table. All the data in the column will be lost.
  - You are about to drop the column `station_id` on the `batch` table. All the data in the column will be lost.
  - Added the required column `container_version_id` to the `batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_version_id` to the `batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `station_version_id` to the `batch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "batch" DROP CONSTRAINT "container_id_pk";

-- DropForeignKey
ALTER TABLE "batch" DROP CONSTRAINT "recipe_id_pk";

-- DropForeignKey
ALTER TABLE "batch" DROP CONSTRAINT "station_id_pk";

-- AlterTable
ALTER TABLE "batch" DROP COLUMN "container_capacity",
DROP COLUMN "container_id",
DROP COLUMN "container_rfid",
DROP COLUMN "recipe_id",
DROP COLUMN "recipe_ingredients",
DROP COLUMN "recipe_name",
DROP COLUMN "recipe_notes",
DROP COLUMN "station_id",
ADD COLUMN     "container_version_id" INTEGER NOT NULL,
ADD COLUMN     "recipe_version_id" INTEGER NOT NULL,
ADD COLUMN     "station_version_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "batch_progress" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "container" ADD COLUMN     "latest_version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "recipe" ADD COLUMN     "latest_version" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "container_version" (
    "id" SERIAL NOT NULL,
    "rfid" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "container_id" INTEGER NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "date_created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "container_version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_version" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "ingredients" JSON NOT NULL,
    "notes" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "date_created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipe_version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "station_version" (
    "id" SERIAL NOT NULL,
    "station_id" INTEGER NOT NULL,
    "mqtt_id" TEXT NOT NULL,
    "last_active" TIMESTAMPTZ(6),
    "last_message" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "date_created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "station_version_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "station_version_mqtt_id_key" ON "station_version"("mqtt_id");

-- RenameForeignKey
ALTER TABLE "batch_progress" RENAME CONSTRAINT "batch_id_pk" TO "batch_progress_batch_id_fkey";

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "batch_container_version_id_fkey" FOREIGN KEY ("container_version_id") REFERENCES "container_version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "batch_recipe_version_id_fkey" FOREIGN KEY ("recipe_version_id") REFERENCES "recipe_version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "batch_station_version_id_fkey" FOREIGN KEY ("station_version_id") REFERENCES "station_version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "container_version" ADD CONSTRAINT "container_version_container_id_fkey" FOREIGN KEY ("container_id") REFERENCES "container"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_version" ADD CONSTRAINT "recipe_version_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
