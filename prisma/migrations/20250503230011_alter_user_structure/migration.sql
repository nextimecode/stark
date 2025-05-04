/*
  Warnings:

  - The primary key for the `CompatibilityAttributes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `recipientId` column on the `Invite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[uid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `userId` on the `CompatibilityAttributes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user1Id` on the `CompatibilityTest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user2Id` on the `CompatibilityTest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `senderId` on the `Invite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `uid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "CompatibilityAttributes" DROP CONSTRAINT "CompatibilityAttributes_userId_fkey";

-- DropForeignKey
ALTER TABLE "CompatibilityTest" DROP CONSTRAINT "CompatibilityTest_user1Id_fkey";

-- DropForeignKey
ALTER TABLE "CompatibilityTest" DROP CONSTRAINT "CompatibilityTest_user2Id_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_senderId_fkey";

-- AlterTable
ALTER TABLE "CompatibilityAttributes" DROP CONSTRAINT "CompatibilityAttributes_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "CompatibilityAttributes_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "CompatibilityTest" DROP COLUMN "user1Id",
ADD COLUMN     "user1Id" INTEGER NOT NULL,
DROP COLUMN "user2Id",
ADD COLUMN     "user2Id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "senderId",
ADD COLUMN     "senderId" INTEGER NOT NULL,
DROP COLUMN "recipientId",
ADD COLUMN     "recipientId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "uid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "CompatibilityTest_user1Id_idx" ON "CompatibilityTest"("user1Id");

-- CreateIndex
CREATE INDEX "CompatibilityTest_user2Id_idx" ON "CompatibilityTest"("user2Id");

-- CreateIndex
CREATE UNIQUE INDEX "CompatibilityTest_user1Id_user2Id_relationshipType_createdA_key" ON "CompatibilityTest"("user1Id", "user2Id", "relationshipType", "createdAt");

-- CreateIndex
CREATE INDEX "Invite_senderId_recipientId_idx" ON "Invite"("senderId", "recipientId");

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "CompatibilityAttributes" ADD CONSTRAINT "CompatibilityAttributes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompatibilityTest" ADD CONSTRAINT "CompatibilityTest_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompatibilityTest" ADD CONSTRAINT "CompatibilityTest_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
