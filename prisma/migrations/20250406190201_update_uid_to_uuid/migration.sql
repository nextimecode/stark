/*
  Warnings:

  - The `uid` column on the `answers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uid` column on the `attachments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uid` column on the `comments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uid` column on the `notifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uid` column on the `questions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uid` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "uid",
ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "uid",
ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "uid",
ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "uid",
ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "uid",
ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "users" DROP COLUMN "uid",
ADD COLUMN     "uid" UUID NOT NULL DEFAULT gen_random_uuid();

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
CREATE UNIQUE INDEX "users_uid_key" ON "users"("uid");
