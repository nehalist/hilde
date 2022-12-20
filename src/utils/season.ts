export function getCurrentSeason() {
  return +(process.env.NEXT_PUBLIC_SEASON || 1);
}
