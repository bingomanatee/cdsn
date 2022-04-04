/*
  Warnings:

  - Added the required column `proc_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "proc_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Process" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "next_proc_ids" TEXT[],

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_next_proc" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_next_proc_AB_unique" ON "_next_proc"("A", "B");

-- CreateIndex
CREATE INDEX "_next_proc_B_index" ON "_next_proc"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_proc_id_fkey" FOREIGN KEY ("proc_id") REFERENCES "Process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_next_proc" ADD FOREIGN KEY ("A") REFERENCES "Process"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_next_proc" ADD FOREIGN KEY ("B") REFERENCES "Process"("id") ON DELETE CASCADE ON UPDATE CASCADE;
