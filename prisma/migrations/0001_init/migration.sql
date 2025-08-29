-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."Hand" AS ENUM ('R', 'L', 'B');

-- CreateEnum
CREATE TYPE "public"."CardType" AS ENUM ('hitter', 'pitcher');

-- CreateEnum
CREATE TYPE "public"."CardLetters" AS ENUM ('AA', 'A', 'B', 'C', 'D', 'E');

-- CreateTable
CREATE TABLE "public"."League" (
    "league_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbr" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,

    CONSTRAINT "League_pkey" PRIMARY KEY ("league_id")
);

-- CreateTable
CREATE TABLE "public"."Conference" (
    "conference_id" SERIAL NOT NULL,
    "league_id" INTEGER NOT NULL,
    "name_long" TEXT NOT NULL,
    "name_short" TEXT NOT NULL,
    "abbr" TEXT NOT NULL,

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("conference_id")
);

-- CreateTable
CREATE TABLE "public"."Division" (
    "division_id" SERIAL NOT NULL,
    "conference_id" INTEGER NOT NULL,
    "name_long" TEXT NOT NULL,
    "name_short" TEXT NOT NULL,
    "abbr" TEXT NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("division_id")
);

-- CreateTable
CREATE TABLE "public"."Franchise" (
    "franchise_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbr" TEXT NOT NULL,

    CONSTRAINT "Franchise_pkey" PRIMARY KEY ("franchise_id")
);

-- CreateTable
CREATE TABLE "public"."LeagueSeason" (
    "league_season_id" SERIAL NOT NULL,
    "league_id" INTEGER NOT NULL,
    "league_year" INTEGER NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,

    CONSTRAINT "LeagueSeason_pkey" PRIMARY KEY ("league_season_id")
);

-- CreateTable
CREATE TABLE "public"."TeamSeason" (
    "team_season_id" SERIAL NOT NULL,
    "franchise_id" INTEGER NOT NULL,
    "division_id" INTEGER NOT NULL,
    "league_season_id" INTEGER NOT NULL,
    "team_name" TEXT NOT NULL,
    "team_nickname" TEXT,
    "team_abbr" TEXT NOT NULL,

    CONSTRAINT "TeamSeason_pkey" PRIMARY KEY ("team_season_id")
);

-- CreateTable
CREATE TABLE "public"."Player" (
    "player_id" TEXT NOT NULL,
    "retrosheet_id" TEXT NOT NULL,
    "mlb_id" TEXT,
    "name_first" TEXT NOT NULL,
    "name_last" TEXT NOT NULL,
    "name_nickname" TEXT,
    "name_display" TEXT,
    "name_roster" TEXT,
    "bats" "public"."Hand",
    "throws" "public"."Hand",
    "debut" DATE,
    "last_game" DATE,
    "birthdate" DATE,
    "deathdate" DATE,
    "is_hof" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("player_id")
);

-- CreateTable
CREATE TABLE "public"."CardDeck" (
    "deck_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbr" TEXT NOT NULL,

    CONSTRAINT "CardDeck_pkey" PRIMARY KEY ("deck_id")
);

-- CreateTable
CREATE TABLE "public"."PlayerCard" (
    "player_card_id" SERIAL NOT NULL,
    "deck_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "card_type" "public"."CardType" NOT NULL,
    "franchise_code" TEXT NOT NULL,

    CONSTRAINT "PlayerCard_pkey" PRIMARY KEY ("player_card_id")
);

-- CreateTable
CREATE TABLE "public"."RosterSlot" (
    "roster_slot_id" SERIAL NOT NULL,
    "team_season_id" INTEGER NOT NULL,
    "player_card_id" INTEGER NOT NULL,
    "start_game" INTEGER NOT NULL,
    "end_game" INTEGER,

    CONSTRAINT "RosterSlot_pkey" PRIMARY KEY ("roster_slot_id")
);

-- CreateTable
CREATE TABLE "public"."HitterCard" (
    "hitter_card_id" SERIAL NOT NULL,
    "player_card_id" INTEGER NOT NULL,
    "display_avg" DOUBLE PRECISION,
    "display_ab" INTEGER,
    "display_2b" INTEGER,
    "display_3b" INTEGER,
    "display_hr" INTEGER,
    "display_rbi" INTEGER,
    "display_bb" INTEGER,
    "display_k" INTEGER,
    "display_sb" INTEGER,
    "display_cs" INTEGER,
    "display_slg" DOUBLE PRECISION,
    "display_obp" DOUBLE PRECISION,
    "stealing" "public"."CardLetters",
    "is_stealer" BOOLEAN,
    "lead_good" TEXT,
    "lead_bad" TEXT,
    "steal_safe_good" INTEGER,
    "steal_safe_bad" INTEGER,
    "bunting" "public"."CardLetters",
    "hit_run" "public"."CardLetters",
    "running" INTEGER,
    "pct_vl" DOUBLE PRECISION,
    "power_vl" BOOLEAN,
    "chance_k_vl" INTEGER,
    "chance_bb_vl" INTEGER,
    "chance_hbp_vl" INTEGER,
    "chance_hit_vl" INTEGER,
    "chance_ob_vl" INTEGER,
    "chance_tb_vl" INTEGER,
    "chance_1b_vl" INTEGER,
    "chance_2b_vl" INTEGER,
    "chance_3b_vl" INTEGER,
    "chance_hr_vl" INTEGER,
    "chance_bphr_vl" INTEGER,
    "chance_bpsi_vl" INTEGER,
    "chance_cl_vl" INTEGER,
    "chance_gba_vl" INTEGER,
    "calc_woba_vl" DOUBLE PRECISION,
    "calc_avg_vl" DOUBLE PRECISION,
    "calc_obp_vl" DOUBLE PRECISION,
    "calc_slg_vl" DOUBLE PRECISION,
    "calc_ops_vl" DOUBLE PRECISION,
    "pct_vr" DOUBLE PRECISION,
    "power_vr" BOOLEAN,
    "chance_k_vr" INTEGER,
    "chance_bb_vr" INTEGER,
    "chance_hbp_vr" INTEGER,
    "chance_hit_vr" INTEGER,
    "chance_ob_vr" INTEGER,
    "chance_tb_vr" INTEGER,
    "chance_1b_vr" INTEGER,
    "chance_2b_vr" INTEGER,
    "chance_3b_vr" INTEGER,
    "chance_hr_vr" INTEGER,
    "chance_bphr_vr" INTEGER,
    "chance_bpsi_vr" INTEGER,
    "chance_cl_vr" INTEGER,
    "chance_gba_vr" INTEGER,
    "calc_woba_vr" DOUBLE PRECISION,
    "calc_avg_vr" DOUBLE PRECISION,
    "calc_obp_vr" DOUBLE PRECISION,
    "calc_slg_vr" DOUBLE PRECISION,
    "calc_ops_vr" DOUBLE PRECISION,

    CONSTRAINT "HitterCard_pkey" PRIMARY KEY ("hitter_card_id")
);

-- CreateTable
CREATE TABLE "public"."PitcherCard" (
    "pitcher_card_id" SERIAL NOT NULL,
    "player_card_id" INTEGER NOT NULL,
    "display_w" INTEGER,
    "display_l" INTEGER,
    "display_era" DOUBLE PRECISION,
    "display_starts" INTEGER,
    "display_saves" INTEGER,
    "display_ip" INTEGER,
    "display_bb" INTEGER,
    "display_k" INTEGER,
    "display_hits" INTEGER,
    "display_hr" INTEGER,
    "fatigue_starter" INTEGER,
    "fatigue_relief" INTEGER,
    "fatigue_closer" INTEGER,
    "short_rest" BOOLEAN,
    "hold" INTEGER,
    "balk" INTEGER,
    "wp" INTEGER,
    "pct_vl" DOUBLE PRECISION,
    "chance_k_vl" INTEGER,
    "chance_bb_vl" INTEGER,
    "chance_hit_vl" INTEGER,
    "chance_ob_vl" INTEGER,
    "chance_tb_vl" INTEGER,
    "chance_1b_vl" INTEGER,
    "chance_2b_vl" INTEGER,
    "chance_3b_vl" INTEGER,
    "chance_hr_vl" INTEGER,
    "chance_bphr_vl" INTEGER,
    "chance_bpsi_vl" INTEGER,
    "chance_gba_vl" INTEGER,
    "calc_woba_vl" DOUBLE PRECISION,
    "calc_avg_vl" DOUBLE PRECISION,
    "calc_obp_vl" DOUBLE PRECISION,
    "calc_slg_vl" DOUBLE PRECISION,
    "calc_ops_vl" DOUBLE PRECISION,
    "pct_vr" DOUBLE PRECISION,
    "chance_k_vr" INTEGER,
    "chance_bb_vr" INTEGER,
    "chance_hit_vr" INTEGER,
    "chance_ob_vr" INTEGER,
    "chance_tb_vr" INTEGER,
    "chance_1b_vr" INTEGER,
    "chance_2b_vr" INTEGER,
    "chance_3b_vr" INTEGER,
    "chance_hr_vr" INTEGER,
    "chance_bphr_vr" INTEGER,
    "chance_bpsi_vr" INTEGER,
    "chance_gba_vr" INTEGER,
    "calc_woba_vr" DOUBLE PRECISION,
    "calc_avg_vr" DOUBLE PRECISION,
    "calc_obp_vr" DOUBLE PRECISION,
    "calc_slg_vr" DOUBLE PRECISION,
    "calc_ops_vr" DOUBLE PRECISION,

    CONSTRAINT "PitcherCard_pkey" PRIMARY KEY ("pitcher_card_id")
);

-- CreateTable
CREATE TABLE "public"."DefenseCard" (
    "defense_card_id" SERIAL NOT NULL,
    "player_card_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "range" INTEGER NOT NULL,
    "e_rating" INTEGER NOT NULL,
    "throw" INTEGER,
    "pb" INTEGER,
    "is_primary" BOOLEAN NOT NULL,
    "arm" INTEGER,

    CONSTRAINT "DefenseCard_pkey" PRIMARY KEY ("defense_card_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "League_name_key" ON "public"."League"("name");

-- CreateIndex
CREATE UNIQUE INDEX "League_abbr_key" ON "public"."League"("abbr");

-- CreateIndex
CREATE INDEX "Conference_league_id_idx" ON "public"."Conference"("league_id");

-- CreateIndex
CREATE UNIQUE INDEX "Conference_league_id_abbr_key" ON "public"."Conference"("league_id", "abbr");

-- CreateIndex
CREATE INDEX "Division_conference_id_idx" ON "public"."Division"("conference_id");

-- CreateIndex
CREATE UNIQUE INDEX "Division_conference_id_abbr_key" ON "public"."Division"("conference_id", "abbr");

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_abbr_key" ON "public"."Franchise"("abbr");

-- CreateIndex
CREATE UNIQUE INDEX "LeagueSeason_league_id_league_year_key" ON "public"."LeagueSeason"("league_id", "league_year");

-- CreateIndex
CREATE INDEX "TeamSeason_franchise_id_idx" ON "public"."TeamSeason"("franchise_id");

-- CreateIndex
CREATE INDEX "TeamSeason_division_id_idx" ON "public"."TeamSeason"("division_id");

-- CreateIndex
CREATE INDEX "TeamSeason_league_season_id_idx" ON "public"."TeamSeason"("league_season_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamSeason_franchise_id_league_season_id_key" ON "public"."TeamSeason"("franchise_id", "league_season_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamSeason_league_season_id_team_abbr_key" ON "public"."TeamSeason"("league_season_id", "team_abbr");

-- CreateIndex
CREATE UNIQUE INDEX "Player_retrosheet_id_key" ON "public"."Player"("retrosheet_id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_mlb_id_key" ON "public"."Player"("mlb_id");

-- CreateIndex
CREATE UNIQUE INDEX "CardDeck_name_key" ON "public"."CardDeck"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CardDeck_abbr_key" ON "public"."CardDeck"("abbr");

-- CreateIndex
CREATE INDEX "PlayerCard_player_id_idx" ON "public"."PlayerCard"("player_id");

-- CreateIndex
CREATE INDEX "PlayerCard_deck_id_idx" ON "public"."PlayerCard"("deck_id");

-- CreateIndex
CREATE INDEX "PlayerCard_franchise_code_idx" ON "public"."PlayerCard"("franchise_code");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerCard_player_id_deck_id_card_type_franchise_code_key" ON "public"."PlayerCard"("player_id", "deck_id", "card_type", "franchise_code");

-- CreateIndex
CREATE INDEX "RosterSlot_team_season_id_idx" ON "public"."RosterSlot"("team_season_id");

-- CreateIndex
CREATE INDEX "RosterSlot_player_card_id_idx" ON "public"."RosterSlot"("player_card_id");

-- CreateIndex
CREATE UNIQUE INDEX "RosterSlot_team_season_id_player_card_id_start_game_end_gam_key" ON "public"."RosterSlot"("team_season_id", "player_card_id", "start_game", "end_game");

-- CreateIndex
CREATE UNIQUE INDEX "HitterCard_player_card_id_key" ON "public"."HitterCard"("player_card_id");

-- CreateIndex
CREATE UNIQUE INDEX "PitcherCard_player_card_id_key" ON "public"."PitcherCard"("player_card_id");

-- CreateIndex
CREATE UNIQUE INDEX "DefenseCard_player_card_id_position_key" ON "public"."DefenseCard"("player_card_id", "position");

-- AddForeignKey
ALTER TABLE "public"."Conference" ADD CONSTRAINT "Conference_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "public"."League"("league_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Division" ADD CONSTRAINT "Division_conference_id_fkey" FOREIGN KEY ("conference_id") REFERENCES "public"."Conference"("conference_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeagueSeason" ADD CONSTRAINT "LeagueSeason_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "public"."League"("league_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamSeason" ADD CONSTRAINT "TeamSeason_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "public"."Division"("division_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamSeason" ADD CONSTRAINT "TeamSeason_franchise_id_fkey" FOREIGN KEY ("franchise_id") REFERENCES "public"."Franchise"("franchise_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamSeason" ADD CONSTRAINT "TeamSeason_league_season_id_fkey" FOREIGN KEY ("league_season_id") REFERENCES "public"."LeagueSeason"("league_season_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerCard" ADD CONSTRAINT "PlayerCard_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "public"."CardDeck"("deck_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerCard" ADD CONSTRAINT "PlayerCard_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."Player"("player_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RosterSlot" ADD CONSTRAINT "RosterSlot_player_card_id_fkey" FOREIGN KEY ("player_card_id") REFERENCES "public"."PlayerCard"("player_card_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RosterSlot" ADD CONSTRAINT "RosterSlot_team_season_id_fkey" FOREIGN KEY ("team_season_id") REFERENCES "public"."TeamSeason"("team_season_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HitterCard" ADD CONSTRAINT "HitterCard_player_card_id_fkey" FOREIGN KEY ("player_card_id") REFERENCES "public"."PlayerCard"("player_card_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PitcherCard" ADD CONSTRAINT "PitcherCard_player_card_id_fkey" FOREIGN KEY ("player_card_id") REFERENCES "public"."PlayerCard"("player_card_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DefenseCard" ADD CONSTRAINT "DefenseCard_player_card_id_fkey" FOREIGN KEY ("player_card_id") REFERENCES "public"."PlayerCard"("player_card_id") ON DELETE CASCADE ON UPDATE CASCADE;

