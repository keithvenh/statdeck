import { prisma } from '@/lib/prisma';

export async function GET() {
  const teams = await prisma.teamSeason.findMany();
  return Response.json(teams);
}