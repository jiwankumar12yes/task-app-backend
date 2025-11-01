/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tasks" DROP CONSTRAINT "Tasks_projectId_fkey";

-- DropTable
DROP TABLE "public"."Project";
