import { prisma } from '@/lib/prisma';

export async function GET() {
  const players = await prisma.player.findMany();
  return Response.json(players);
}
