/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `nameNickname` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Player" DROP COLUMN "imageUrl",
DROP COLUMN "nameNickname";
