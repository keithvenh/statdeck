-- CreateEnum
CREATE TYPE "public"."GameStatus" AS ENUM ('scheduled', 'in_progress', 'final', 'postponed', 'suspended');

-- CreateTable
CREATE TABLE "public"."Game" (
    "game_id" SERIAL NOT NULL,
    "league_season_id" INTEGER NOT NULL,
    "game_number" INTEGER NOT NULL,
    "game_set" INTEGER NOT NULL,
    "status" "public"."GameStatus" NOT NULL DEFAULT 'scheduled',

    CONSTRAINT "Game_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "public"."GameTeam" (
    "game_team_id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "team_season_id" INTEGER NOT NULL,
    "is_home" BOOLEAN NOT NULL,
    "runs" INTEGER,
    "hits" INTEGER,
    "errors" INTEGER,

    CONSTRAINT "GameTeam_pkey" PRIMARY KEY ("game_team_id")
);

-- CreateIndex
CREATE INDEX "Game_league_season_id_game_set_idx" ON "public"."Game"("league_season_id", "game_set");

-- CreateIndex
CREATE UNIQUE INDEX "Game_league_season_id_status_game_number_key" ON "public"."Game"("league_season_id", "status", "game_number");

-- CreateIndex
CREATE INDEX "GameTeam_team_season_id_idx" ON "public"."GameTeam"("team_season_id");

-- CreateIndex
CREATE UNIQUE INDEX "GameTeam_game_id_team_season_id_key" ON "public"."GameTeam"("game_id", "team_season_id");

-- CreateIndex
CREATE UNIQUE INDEX "GameTeam_game_id_is_home_key" ON "public"."GameTeam"("game_id", "is_home");

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_league_season_id_fkey" FOREIGN KEY ("league_season_id") REFERENCES "public"."LeagueSeason"("league_season_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GameTeam" ADD CONSTRAINT "GameTeam_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."Game"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GameTeam" ADD CONSTRAINT "GameTeam_team_season_id_fkey" FOREIGN KEY ("team_season_id") REFERENCES "public"."TeamSeason"("team_season_id") ON DELETE CASCADE ON UPDATE CASCADE;
