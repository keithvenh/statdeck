type StandingsRowProps = { team_abbr:string; team_name:string; wins:number; losses:number; win_pct:number; };
export default function StandingsRow({team_abbr, team_name, wins, losses, win_pct}: StandingsRowProps) {
  return (

    <tr>
      <td>{team_name}</td>
      <td>{wins}</td>
      <td>{losses}</td>
      <td>{Math.round(win_pct*1000)/1000}</td>
    </tr>
    
  )
}