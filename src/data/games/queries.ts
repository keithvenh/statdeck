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

export async function getTeamRecordAtGametime(leagueSeasonId: number, teamSeasonId: number, gameNumber:number) {
  const games = await prisma.game.findMany({
    where: {
      league_season_id: leagueSeasonId, 
      game_number: {lte: gameNumber},
      status: 'final',
      game_teams: { some: {team_season_id: teamSeasonId }}
    },
    select: {game_number: true, game_teams: {select: { team_season_id: true, runs: true } } },
    orderBy: {game_number: 'asc'},
  });
  return games.reduce(({wins, losses}, g) => {
    const tm = g.game_teams.find(t => t.team_season_id === teamSeasonId);
    const opp = g.game_teams.find(t => t.team_season_id !== teamSeasonId);
    if(tm?.runs == null || opp?.runs == null) return {wins,losses}
    return tm.runs > opp.runs ? {wins: wins+1, losses} : tm.runs < opp.runs ? {wins, losses: losses + 1} : {wins, losses};
  }, {wins: 0, losses: 0});
}
