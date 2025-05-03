/*
  Warnings:

  - The primary key for the `CompatibilityAttributes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CompatibilityTest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CompatibilityTest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Invite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Invite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[uid]` on the table `CompatibilityAttributes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `CompatibilityAttributes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `CompatibilityTest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.
  - The required column `uid` was added to the `CompatibilityAttributes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uid` was added to the `CompatibilityTest` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uid` was added to the `Invite` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "CompatibilityAttributes" DROP CONSTRAINT "CompatibilityAttributes_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "uid" TEXT NOT NULL,
ADD CONSTRAINT "CompatibilityAttributes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CompatibilityTest" DROP CONSTRAINT "CompatibilityTest_pkey",
ADD COLUMN     "uid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CompatibilityTest_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_pkey",
ADD COLUMN     "uid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Invite_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "CompatibilityAttributes_uid_key" ON "CompatibilityAttributes"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "CompatibilityAttributes_userId_key" ON "CompatibilityAttributes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompatibilityTest_uid_key" ON "CompatibilityTest"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_uid_key" ON "Invite"("uid");
