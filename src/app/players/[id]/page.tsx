import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

type Params = { params: { id: string } };

export default async function PlayerPage({ params }: Params) {
  const player = await prisma.player.findUnique({
    where: { id: Number(params.id) },
  });

  if (!player) return <div>Player not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{player.nameDisplay}</h1>
      <p>Bats: {player.bats} | Throws: {player.throws}</p>
    </div>
  );
}
