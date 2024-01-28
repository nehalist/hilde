export function RatingChange({ change }: { change: number }) {
  if (change > 0) {
    return <span className="text-xs text-green-500">+{change.toFixed(2)}</span>;
  } else if (change < 0) {
    return <span className="text-xs text-red-500">{change.toFixed(2)}</span>;
  }
  return null;
}
