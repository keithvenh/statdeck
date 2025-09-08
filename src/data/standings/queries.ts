import 'server-only';
import { prisma } from '@/lib/prisma';

export async function getStandings(leagueSeasonId: number) {
  return prisma.$queryRaw<
    { team_season_id:number; team_name:string; team_abbr:string;
      conference_id:number; conference_abbr:string; conference_name_short:string; conference_name_long:string;
      division_id:number; division_abbr:string; division_name_short:string; division_name_long:string;
      wins:number; losses:number; win_pct:number }[]
  >`
    SELECT *,
    wins,
    losses,
    CASE WHEN (wins + losses) > 0
      THEN wins::float8 / (wins + losses)
      ELSE 0
    END AS win_pct
    FROM "standings_v"
    WHERE league_season_id = ${leagueSeasonId}
    ORDER BY conference_abbr, division_abbr, win_pct DESC, team_abbr;
  `
}