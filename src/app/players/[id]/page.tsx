import { prisma } from '@/lib/prisma';

type Params = { params: { id: string } };

export default async function PlayerPage({ params }: Params) {
  const player = await prisma.player.findUnique({
    where: { player_id: params.id },
    include: {
      player_cards: {
        orderBy: [{deck_id: 'asc'}],
        include: {
          hitter_card: {},
          pitcher_card: {}
        }
      }
    }
  });

  if (!player) return <div>Player not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{player.name_display}</h1>
      <p>Bats: {player.bats} | Throws: {player.throws}</p>
      <ul className="space-y-2">
        {player.player_cards.map(card => (
          <li key={card.player_card_id}>{card.hitter_card.woba_vl} | {card.hitter_card.woba_vr} | {(card.hitter_card.woba_vl + card.hitter_card.woba_vr)/2}</li>
        ))}
      </ul>
    </div>
  );
}
