export const defaultRating = 1000;

export function getExpectedRating(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

export function calculateRating(expected: number, actual: number, current: number): number {
  let k;
  if (current < defaultRating + 200) {
    k = 32;
  } else if (current < defaultRating + 400) {
    k = 24;
  } else {
    k = 16;
  }
  return current + k * (actual - expected);
}
