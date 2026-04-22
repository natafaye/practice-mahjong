// Pre-calculate log-factorials for speed
// Standard Mahjong deck has 152 tiles so 200 is plenty
const MAX_TILES = 200;
const LOG_FACTORIALS = new Array(MAX_TILES + 1).fill(0);
for (let i = 2; i <= MAX_TILES; i++) {
  LOG_FACTORIALS[i] = LOG_FACTORIALS[i - 1] + Math.log(i);
}

/**
 * Natural log of nCr: ln(n! / (r! * (n-r)!))
 * Allows us to work in logarithmic space with very big numbers without losing precision
 */
export const lnnCr = (n: number, r: number): number => {
  if (r < 0 || r > n) return -Infinity;
  if (r === 0 || r === n) return 0;
  return LOG_FACTORIALS[n] - LOG_FACTORIALS[r] - LOG_FACTORIALS[n - r];
};