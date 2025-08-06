/*
  Warnings:

  - Added the required column `altid` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "public".player_id_seq;
ALTER TABLE "public"."Player" ADD COLUMN     "altid" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('"public".player_id_seq');
ALTER SEQUENCE "public".player_id_seq OWNED BY "public"."Player"."id";
