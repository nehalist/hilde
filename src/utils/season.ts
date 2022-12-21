export function getCurrentSeason() {
  const season = process.env.NEXT_PUBLIC_SEASON;
  if (!season) {
    return 1;
  }
  return parseInt(season, 10);
}
