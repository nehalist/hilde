export const k = 32;
export const defaultRating = 1000;

export function getExpectedRating(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

export function calculateRating(expected: number, actual: number, current: number): number {
  return current + k * (actual - expected);
}
