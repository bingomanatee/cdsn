-- CreateEnum
CREATE TYPE "TaskArtifactType" AS ENUM ('INPUT', 'OUTPUT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'STARTED', 'FINISHED', 'FAILED', 'STALE');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'PENDING',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3) NOT NULL,
    "error" JSONB,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artifact" (
    "id" TEXT NOT NULL,
    "creator_task_id" TEXT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "data" JSONB,

    CONSTRAINT "Artifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskArtifact" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "artifact_id" TEXT NOT NULL,
    "type" "TaskArtifactType" NOT NULL,

    CONSTRAINT "TaskArtifact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskArtifact" ADD CONSTRAINT "TaskArtifact_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskArtifact" ADD CONSTRAINT "TaskArtifact_artifact_id_fkey" FOREIGN KEY ("artifact_id") REFERENCES "Artifact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
