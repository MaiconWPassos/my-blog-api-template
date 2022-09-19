/*
  Warnings:

  - Added the required column `github_url` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_url` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "github_url" TEXT NOT NULL,
ADD COLUMN     "video_url" TEXT NOT NULL;
