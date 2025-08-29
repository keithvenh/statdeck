import { prisma } from '@/lib/prisma';

type Params = { params: { id: string } };

export default async function LeaguePage({ params }: Params) {
  const league = await prisma.league.findUnique({
    where: { league_id: Number(params.id) },
  });

  if (!league) return <div>League not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{league.abbr} | {league.name}</h1>
      <h2>Seasons</h2>
    </div>
  );
}