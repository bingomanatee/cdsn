/*
  Warnings:

  - You are about to drop the column `creator_task_id` on the `Artifact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artifact" DROP COLUMN "creator_task_id";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "parent_task_id" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_parent_task_id_fkey" FOREIGN KEY ("parent_task_id") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
