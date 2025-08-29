import { prisma } from '@/lib/prisma';
import Link from 'next/link';

import GamesBar from "@/components/features/GamesBar";

const DEFAULT_LEAGUE = "WSOB";
const DEFAULT_YEAR = 1;
const DEFAULT_LEAGUE_SEASON_ID = 1;

export default async function Home() {

  let season = await prisma.leagueSeason.findFirst({
    where: {league: {abbr: DEFAULT_LEAGUE}, league_year: DEFAULT_YEAR},
    include: {league: true, teams: {orderBy: {team_abbr: 'asc'}}}
  });

  if (!season) {
    season = await prisma.leagueSeason.findFirst({
      where: { league: { abbr: DEFAULT_LEAGUE } },
      orderBy: { league_year: 'desc' },
      include: { league: true, teams: { orderBy: { team_abbr: 'asc' } } }
    });
  }

  if (!season) return <main className="p-6">No seasons found.</main>
  return (
    <main className="p-6">
      <h1 className="text-xl font-semi-bold">
        {season.league.name}
      </h1>
      <GamesBar leagueSeasonId={DEFAULT_LEAGUE_SEASON_ID} />
      <ul>
        {season.teams.map(t => (
          <li key={t.team_season_id}>
            <Link href={`/teams/${t.team_season_id}`}>
              <div className="font-medium">+ {t.team_name} ({t.team_abbr})</div>
            </Link>
          </li>
        ))}

      </ul>
    </main>
  );
}
