import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  const players = await prisma.player.findMany();
  return Response.json(players);
}
