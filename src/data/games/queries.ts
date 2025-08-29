import 'server-only';
import { prisma } from "@/lib/prisma";

export async function getCurrentSetGames(leagueSeasonId: number ) {
  const currentSet = await prisma.game.findFirst({
    where: {league_season_id: leagueSeasonId, status: { in: ['scheduled', 'in_progress'] } },
    orderBy: {game_set: 'asc'},
    select: {game_set: true}
  })
  
  if (!currentSet) return { game_set: null, games: []};

  const games = await prisma.game.findMany({
    where: {league_season_id: leagueSeasonId, game_set: currentSet.game_set},
    orderBy: { game_number: 'asc' },
    include: {game_teams: {include: { team: { select: { team_abbr: true, team_name: true }}}}}
  });

  return {game_set: currentSet.game_set, games}
}