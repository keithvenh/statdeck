import Link from 'next/link';

async function getLeagues() {
  const res = await fetch('http://localhost:3000/api/leagues', { cache: 'no-store' });
  return res.json();
}

export default async function PlayersPage() {
  const leagues = await getLeagues();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Leagues</h1>
      <ul className="space-y-2">
        {leagues.map((league: any) => (
          <li key={league.id} className="border p-2 rounded">
            <Link href={`/leagues/${league.league_id}`}>
              {league.abbr} | {league.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}