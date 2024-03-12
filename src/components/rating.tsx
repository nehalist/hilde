export function Rating({ rating }: { rating: number }) {
  return <>{Math.round(rating)}</>;
}
