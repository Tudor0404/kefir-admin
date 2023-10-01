-- CreateTable
CREATE TABLE "batch" (
    "id" SERIAL NOT NULL,
    "date_started" TIMESTAMPTZ(6) NOT NULL,
    "date_finished" TIMESTAMPTZ(6),
    "recipe_id" INTEGER NOT NULL,
    "recipe_name" TEXT NOT NULL,
    "recipe_ingredients" JSONB NOT NULL,
    "recipe_notes" TEXT,
    "container_id" INTEGER NOT NULL,
    "container_rfid" TEXT NOT NULL,
    "container_capacity" INTEGER NOT NULL,
    "station_id" INTEGER NOT NULL,
    "is_experiment" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,

    CONSTRAINT "batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batch_progress" (
    "id" SERIAL NOT NULL,
    "batch_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "temperature" DECIMAL(5,2),
    "humidity" DECIMAL(5,2),
    "ph" DECIMAL(4,2),

    CONSTRAINT "batch_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "container" (
    "id" SERIAL NOT NULL,
    "rfid" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "container_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ingredients" JSON NOT NULL,
    "notes" TEXT,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "station" (
    "id" SERIAL NOT NULL,
    "mqtt_id" TEXT NOT NULL,
    "last_active" TIMESTAMPTZ(6),
    "last_message" TEXT,

    CONSTRAINT "station_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "container_id_pk" FOREIGN KEY ("container_id") REFERENCES "container"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "recipe_id_pk" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "station_id_pk" FOREIGN KEY ("station_id") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
