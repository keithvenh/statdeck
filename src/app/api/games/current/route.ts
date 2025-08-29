import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // no caching

// GET /api/games/current?leagueSeasonId=123
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const leagueSeasonId = Number(searchParams.get("leagueSeasonId"));
  if (!leagueSeasonId) return NextResponse.json({ game_set: null, games: [] });

  // find the lowest game_set with any scheduled/in_progress game
  const cur = await prisma.game.findFirst({
    where: { league_season_id: leagueSeasonId, status: { in: ["scheduled","in_progress"] } },
    orderBy: { game_set: "asc" },
    select: { game_set: true },
  });
  if (!cur) return NextResponse.json({ game_set: null, games: [] });

  const games = await prisma.game.findMany({
    where: {
      league_season_id: leagueSeasonId,
      game_set: cur.game_set,
      status: { in: ["scheduled","in_progress"] },
    },
    orderBy: { game_number: "asc" },
    include: {
      game_teams: {
        include: {
          team: { select: { team_season_id: true, team_abbr: true, team_name: true } },
        },
      },
    },
  });

  return NextResponse.json({ game_set: cur.game_set, games });
}
