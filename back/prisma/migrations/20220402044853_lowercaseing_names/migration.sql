/*
  Warnings:

  - You are about to drop the `Artifact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Process` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskArtifact` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "task_artifact_type" AS ENUM ('INPUT', 'OUTPUT');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDING', 'STARTED', 'FINISHED', 'FAILED', 'STALE');

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_parent_task_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_proc_id_fkey";

-- DropForeignKey
ALTER TABLE "TaskArtifact" DROP CONSTRAINT "TaskArtifact_artifact_id_fkey";

-- DropForeignKey
ALTER TABLE "TaskArtifact" DROP CONSTRAINT "TaskArtifact_task_id_fkey";

-- DropForeignKey
ALTER TABLE "_next_proc" DROP CONSTRAINT "_next_proc_A_fkey";

-- DropForeignKey
ALTER TABLE "_next_proc" DROP CONSTRAINT "_next_proc_B_fkey";

-- DropTable
DROP TABLE "Artifact";

-- DropTable
DROP TABLE "Process";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "TaskArtifact";

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "TaskArtifactType";

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "proc_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT E'PENDING',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3) NOT NULL,
    "error" JSONB,
    "parent_task_id" TEXT,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "process" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "next_proc_ids" TEXT[],

    CONSTRAINT "process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artifact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "data" JSONB,

    CONSTRAINT "artifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_artifact" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "artifact_id" TEXT NOT NULL,
    "type" "task_artifact_type" NOT NULL,

    CONSTRAINT "task_artifact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_parent_task_id_fkey" FOREIGN KEY ("parent_task_id") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_proc_id_fkey" FOREIGN KEY ("proc_id") REFERENCES "process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_artifact" ADD CONSTRAINT "task_artifact_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_artifact" ADD CONSTRAINT "task_artifact_artifact_id_fkey" FOREIGN KEY ("artifact_id") REFERENCES "artifact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_next_proc" ADD FOREIGN KEY ("A") REFERENCES "process"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_next_proc" ADD FOREIGN KEY ("B") REFERENCES "process"("id") ON DELETE CASCADE ON UPDATE CASCADE;
