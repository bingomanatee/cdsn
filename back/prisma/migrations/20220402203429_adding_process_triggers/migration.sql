-- CreateEnum
CREATE TYPE "comp" AS ENUM ('EQ', 'LT', 'GT', 'NE', 'REGEX');

-- CreateTable
CREATE TABLE "process_trigger" (
    "id" TEXT NOT NULL,
    "proc_id" TEXT NOT NULL,
    "type" TEXT,
    "query" TEXT,
    "query_value" TEXT,
    "query_comp" "comp" DEFAULT E'EQ',

    CONSTRAINT "process_trigger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "process_trigger" ADD CONSTRAINT "process_trigger_proc_id_fkey" FOREIGN KEY ("proc_id") REFERENCES "process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
