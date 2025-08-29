import 'server-only';
import styles from "./GamesBar.module.css";
import { getCurrentSetGames } from '@/data/games';


export default async function GamesBar({ leagueSeasonId }: { leagueSeasonId: number }) {
  const currentGames = await getCurrentSetGames(leagueSeasonId);

  if (!currentGames.games.length) return null;

  const sortedGames = [...currentGames.games].sort((a, b) => {
    const wa = a.status === 'final' ? 1 : 0;
    const wb = b.status === 'final' ? 1 : 0;
    return wa - wb || a.game_number - b.game_number;
  });

  return (
    <div className={styles.scroller}>
      {sortedGames.map(game => {
        const home = game.game_teams.find(t => t.is_home)!;
        const away = game.game_teams.find(t => !t.is_home)!;

        

        return (
          <div className={styles.card} key={game.game_id}>
            <p className={styles.meta}>{game.game_number}</p>
            <div className={styles.data}>
              <div className={styles.lines}>
                <div className={`${styles.line} ${away.runs! > home.runs! ? styles.winner : ""}`}>
                  <p>{away.team.team_abbr}</p> 
                  <p>{away.runs ?? ""}</p>
                </div>
                <div className={`${styles.line} ${home.runs! > away.runs! ? styles.winner : ""}`}>
                  <p>{home.team.team_abbr}</p> 
                  <p>{home.runs ?? ""}</p>
                </div>
              </div>
              <div className={styles.sub}>{game.status == 'final' ? "F" : ""}</div>
            </div>
          </div>
      )})}
    </div>
  );
}
