-- CreateTable
CREATE TABLE "public"."Player" (
    "id" INTEGER NOT NULL,
    "nameFirst" TEXT NOT NULL,
    "nameLast" TEXT NOT NULL,
    "nameFirstLast" TEXT NOT NULL,
    "nameLastFirst" TEXT NOT NULL,
    "nameNickname" TEXT,
    "nameDisplay" TEXT NOT NULL,
    "nameLineup" TEXT NOT NULL,
    "imageUrl" TEXT,
    "bats" TEXT NOT NULL,
    "throws" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
