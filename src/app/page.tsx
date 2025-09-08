import { prisma } from '@/lib/prisma';
import Link from 'next/link';

import GamesBar from "@/components/features/GamesBar";
import Standings from "@/components/features/Standings";

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
      <Standings leagueSeasonId={DEFAULT_LEAGUE_SEASON_ID} />
    </main>
  );
}
