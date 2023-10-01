/*
  Warnings:

  - A unique constraint covering the columns `[mqtt_id]` on the table `station` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "station_mqtt_id_key" ON "station"("mqtt_id");
