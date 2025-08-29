import { prisma } from '@/lib/prisma';

type Params = { params: { id: string } };

export default async function TeamPage({ params }: Params) {
  const team = await prisma.teamSeason.findUnique({
    where: { team_season_id: Number(params.id) },
    include: {roster_slots: {include: {player_card: {include: {player: true}}}}}
  });

  if (!team) return <div>League not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{team.team_name} ({team.team_abbr})</h1>
      <ul>
        {team.roster_slots.map(rs => (
          <li>{rs.player_card.player.name_display}</li>
        ))}
      </ul>
    </div>
  );
}