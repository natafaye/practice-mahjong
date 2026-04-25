import Chance from "chance"

/**
 * Shuffles an array of any type and returns the result
 * (does not mutate the original array)
 */
export const shuffleArray = <T>(array: Array<T>, seed: string) => {
  return new Chance(seed).shuffle(array)
}