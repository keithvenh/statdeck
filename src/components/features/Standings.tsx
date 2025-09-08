import 'server-only';
import styles from "./Standings.module.css";
import { getStandings } from '@/data/standings';

import StandingsRow from './StandingsRow';
import {Fragment} from 'react';

export default async function Standings({ leagueSeasonId }: { leagueSeasonId: number }) {
  const standings = await getStandings(leagueSeasonId);

  if (!standings.length) return null;

  const byWinPct = (a:any, b:any) => b.win_pct - a.win_pct || Number(b.wins) - Number(a.wins)
  const byGB = (a:any, b:any) => (Number(b.wins) - Number(a.wins)) + (Number(a.losses) - Number(b.losses))
  const calcGB = (gbGroup:any, t:any) => {
    const lead = gbGroup.sort(byGB)[0];
    const gb = ((Number(lead.wins) - Number(t.wins)) + (Number(t.losses) - Number(lead.losses)))/2
    return gb == 0 ? "-" : gb
  }

  function conferenceStandings(rows:any[], conferenceAbbr:string) {
    return rows.filter(r => r.conference_abbr === conferenceAbbr).sort(byWinPct);
  }

  function divisionStandings(rows:any[], divisionAbbr:string) {
    return rows.filter(r => r.division_abbr === divisionAbbr).sort(byGB);
  }

  const conferences = Array.from(new Map(standings.map(s => [s.conference_id,{id: s.conference_id, name_short: s.conference_name_short, name_long: s.conference_name_long, abbr: s.conference_abbr}])).values())
  const divisions = Array.from(new Map(standings.map(s => [s.division_id,{id: s.division_id, name_short: s.division_name_short, name_long: s.division_name_long, abbr: s.division_abbr, conference_id: s.conference_id}])).values())

  return (
    <div className={styles.container}>
      <table>
        {conferences.map(c => {
          return (
            <Fragment key={c.id}>
              <tr className={styles.conference}>
                <th colSpan={5}>{c.name_long}</th>
              </tr>
              {divisions.map(d => {
                if(d.conference_id !== c.id) return null;
                return (
                  <Fragment key={d.id}>
                    <tr className={styles.division}>
                      <th>{d.name_short}</th>
                      <th>W</th>
                      <th>L</th>
                      <th>PCT</th>
                      <th>GB</th>
                    </tr>
                    {(() => {
                      const divStand = divisionStandings(standings, d.abbr);
                      return divStand.map(team => (
                        <tr key={team.id} className={styles.teamRow}>
                          <td>{team.team_abbr}</td>
                          <td>{team.wins}</td>
                          <td>{team.losses}</td>
                          <td>{team.win_pct < 1 ? (Math.round(team.win_pct*1000)/1000).toFixed(3).slice(1) : "1.000"}</td>
                          <td>{calcGB(divStand,team)}</td>
                        </tr>
                      ));
                    })()}
                  </Fragment>
                )
              })}
            </Fragment>
          )
        })}
      </table>
    </div>
  );
}