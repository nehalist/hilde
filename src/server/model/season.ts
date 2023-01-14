import { prisma } from "~/server/prisma";

export async function getCurrentSeason() {
  const season = await prisma.season.findFirst({
    where: {
      current: true,
    },
  });
  if (! season) {
    return 1;
  }
  return season.number;
}
