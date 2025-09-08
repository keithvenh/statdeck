import styles from "./GameCard.module.css";

import { getTeamRecordAtGametime } from "@/data/games";

const DEFAULT_LEAGUE_SEASON_ID = 1

export default async function GamesCard({game}: any) {
  const home = game.game_teams.find((t: {is_home: boolean}) => t.is_home)!;
  const away = game.game_teams.find((t: {is_home: boolean}) => !t.is_home)!;
  const home_record = await getTeamRecordAtGametime(DEFAULT_LEAGUE_SEASON_ID, home.team_season_id, game.game_number)
  const away_record = await getTeamRecordAtGametime(DEFAULT_LEAGUE_SEASON_ID, away.team_season_id, game.game_number)
  return (
    <div className={styles.gamesCard}>
      <div className={styles.headers}>
        <div className={styles.teamSlot}></div>
        <div className={styles.scoreSlot}>
          <div>
            <p>R</p>
            <p>H</p>
            <p>E</p>
          </div>
        </div>
      </div>
      <div className={styles.teamSlot}>
        <div className={styles.teamInfo}>
          <p className={styles.teamName}>{away.team.team_name}</p>
          <p className={styles.teamRecord}>{home_record.wins}-{home_record.losses}</p>
        </div>
        <div className={styles.teamInfo}>
          <p className={styles.teamName}>{home.team.team_name}</p>
          <p className={styles.teamRecord}>{away_record.wins}-{away_record.losses}</p>
        </div>
      </div>
      <div className={styles.scoreSlot}>
        <div>
          <p>{game.status === "final" ? away.runs: ""}</p>
          <p>{game.status === "final" ? away.hits: ""}</p>
          <p>{game.status === "final" ? away.errors: ""}</p>
        </div>
        <div>
          <p>{game.status === "final" ? home.runs: ""}</p>
          <p>{game.status === "final" ? home.hits: ""}</p>
          <p>{game.status === "final" ? away.errors: ""}</p>
        </div>
      </div>
      <div className={styles.gameInfo}>
        <p>{game.status === "final" ? "F" : game.game_number}</p>
      </div>
    </div>
  )
}