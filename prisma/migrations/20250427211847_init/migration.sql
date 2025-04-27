/*
  Warnings:

  - A unique constraint covering the columns `[user1Id,user2Id,relationshipType,createdAt]` on the table `CompatibilityTest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `relationshipType` to the `CompatibilityTest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RelationshipType" AS ENUM ('LOVE', 'FRIENDSHIP', 'WORK', 'FAMILY');

-- DropIndex
DROP INDEX "CompatibilityTest_user1Id_user2Id_createdAt_key";

-- AlterTable
ALTER TABLE "CompatibilityTest" ADD COLUMN     "relationshipType" "RelationshipType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CompatibilityTest_user1Id_user2Id_relationshipType_createdA_key" ON "CompatibilityTest"("user1Id", "user2Id", "relationshipType", "createdAt");
