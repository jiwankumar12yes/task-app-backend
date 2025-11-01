/*
  Warnings:

  - You are about to drop the column `assignedToId` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Tasks" DROP CONSTRAINT "Tasks_assignedToId_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "assignedToId",
DROP COLUMN "projectId",
ADD COLUMN     "ownerId" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "refreshToken" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
