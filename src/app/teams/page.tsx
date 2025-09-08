import Link from 'next/link';

async function getTeams() {
  const res = await fetch('http://localhost:3000/api/players', { cache: 'no-store' });
  return res.json();
}

export default async function PlayersPage() {
  const players = await getPlayers();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Players</h1>
      <ul className="space-y-2">
        {players.map((p: any) => (
          <li key={p.id} className="border p-2 rounded">
            <Link href={`/players/${p.player_id}`}>
              {p.name_display} ({p.bats}/{p.throws})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}