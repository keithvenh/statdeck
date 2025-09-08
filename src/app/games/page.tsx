import { getCurrentSetGames } from '@/data/games';

import GameCard from '@/components/features/GameCard';

const DEFAULT_LEAGUE_SEASON_ID = 1;

export default async function Games() {
  const currentSetGames = await getCurrentSetGames(DEFAULT_LEAGUE_SEASON_ID);

  const sortedGames = [...currentSetGames.games].sort((a, b) => {
    const wa = a.status === 'final' ? 1 : 0;
    const wb = b.status === 'final' ? 1 : 0;
    return wa - wb || a.game_number - b.game_number;
  });

  return (
    <main>
      {sortedGames.map(g => {
        return (
          <GameCard key={g.game_id} game={g} />
        )
      })}
    </main>
  )
}