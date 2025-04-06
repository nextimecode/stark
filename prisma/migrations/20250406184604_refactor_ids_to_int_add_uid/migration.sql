/*
  Warnings:

  - The primary key for the `answers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `answers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `attachments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `attachments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `question_id` column on the `attachments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `answer_id` column on the `attachments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `comments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `question_id` column on the `comments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `answer_id` column on the `comments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `notifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `notifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `questions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `best_answer_id` column on the `questions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[uid]` on the table `answers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `attachments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `notifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `questions` will be added. If there are existing duplicate values, this will fail.
  - The required column `uid` was added to the `answers` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `question_id` on the `answers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `uid` was added to the `attachments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uid` was added to the `comments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uid` was added to the `notifications` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uid` was added to the `questions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_question_id_fkey";

-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_question_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_question_id_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_best_answer_id_fkey";

-- AlterTable
ALTER TABLE "answers" DROP CONSTRAINT "answers_pkey",
ADD COLUMN     "uid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "question_id",
ADD COLUMN     "question_id" INTEGER NOT NULL,
ADD CONSTRAINT "answers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_pkey",
ADD COLUMN     "uid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "question_id",
ADD COLUMN     "question_id" INTEGER,
DROP COLUMN "answer_id",
ADD COLUMN     "answer_id" INTEGER,
ADD CONSTRAINT "attachments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "comments" DROP CONSTRAINT "comments_pkey",
ADD COLUMN     "uid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "question_id",
ADD COLUMN     "question_id" INTEGER,
DROP COLUMN "answer_id",
ADD COLUMN     "answer_id" INTEGER,
ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_pkey",
ADD COLUMN     "uid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "questions" DROP CONSTRAINT "questions_pkey",
ADD COLUMN     "uid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "best_answer_id",
ADD COLUMN     "best_answer_id" INTEGER,
ADD CONSTRAINT "questions_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "answers_uid_key" ON "answers"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "attachments_uid_key" ON "attachments"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "comments_uid_key" ON "comments"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_uid_key" ON "notifications"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "questions_uid_key" ON "questions"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "questions_best_answer_id_key" ON "questions"("best_answer_id");

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_best_answer_id_fkey" FOREIGN KEY ("best_answer_id") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
