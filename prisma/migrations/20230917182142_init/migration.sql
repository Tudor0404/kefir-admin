-- AddForeignKey
ALTER TABLE "batch_progress" ADD CONSTRAINT "batch_id_pk" FOREIGN KEY ("batch_id") REFERENCES "batch"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
