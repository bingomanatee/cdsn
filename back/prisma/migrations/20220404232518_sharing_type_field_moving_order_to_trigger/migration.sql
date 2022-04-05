/*
  Warnings:

  - You are about to drop the column `order` on the `process` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "process" DROP COLUMN "order",
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "process_trigger" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
