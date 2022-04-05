/*
  Warnings:

  - You are about to drop the column `query_value` on the `process_trigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "process_trigger" DROP COLUMN "query_value",
ADD COLUMN     "query_comp_value" TEXT;
