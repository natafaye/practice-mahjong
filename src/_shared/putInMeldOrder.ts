import type { MahjongTile } from "../types";
import { checkIfMeldValid } from "./checkIfMeldValid";
import { getAllPermutations } from "./utilities";

/**
 * Returns a new array in the order of a valid meld
 * If there is no valid meld, returns the original array
 */
export const putInMeldOrder = (meld: MahjongTile[], possibleMelds: string[]) => {
  const permutations = getAllPermutations(meld);
  return (
    permutations.find((p) => checkIfMeldValid(p, possibleMelds, false)) || meld
  );
}
