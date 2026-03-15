/*
  Warnings:

  - Added the required column `isDeleted` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL,
ADD COLUMN     "needsPasswordChange" BOOLEAN NOT NULL DEFAULT false;
