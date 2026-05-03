import { DOTS, FLOWER_SUIT, JOKER_SUIT } from "../constants";
import type { MahjongHand, MahjongTile, MahjongTileRow, MatchData } from "../types";
import { getExactMeldCombinations } from "./getExactMeldCombinations";
import { getExposedMelds } from "./getExposedMelds";

/**
 * Figure out the best way to match these tiles to this hand
 */
export const matchTilesToHand = (
  concealedTiles: MahjongTileRow,
  exposedTiles: MahjongTileRow,
  hand: MahjongHand,
): MatchData => {
  // Fail immediately if the hand must be concealed but has exposed melds
  if (hand.concealed && exposedTiles.length > 0) {
    return { matches: 0, assignedMelds: [], leftoverTiles: concealedTiles };
  }

  let bestMatches = -1;
  let bestAssignment: MahjongTile[][] = [];
  let bestLeftovers: MahjongTile[] = [];
  const concealed = concealedTiles.filter((t) => typeof t !== "string") as MahjongTile[];
  const exposed = getExposedMelds(exposedTiles);

  // Check every combo of suits and numbers (G is BAMS, 222 is meld of evens)
  const exactHands = getExactMeldCombinations(hand);
  for (const exactMelds of exactHands) {
    let currentMatches = 0;
    const availableTiles = [...concealed];
    const availableMelds = [...exposed];
    const currentAssignment: MahjongTile[][] = hand.melds.map(() => []);

    // Check every meld in the hand ("FFFF" then "1111" then "22" then "3333", etc)
    for (let i = 0; i < exactMelds.length; i++) {
      let { suit, numbers } = exactMelds[i];
      // Convert Dot Dragons into 0's so they match availableMelds
      if (suit === DOTS && /^D+$/.test(numbers)) {
        numbers = numbers.replaceAll(/D/g, "0");
      }
      // Check for already exposed tiles first and take those if you find it
      const meldMatch = availableMelds.find((meld) => meld.suit === suit && meld.numbers === numbers);
      if (meldMatch) {
        availableMelds.splice(availableMelds.indexOf(meldMatch), 1);
        currentAssignment[i] = exposedTiles.slice(meldMatch.startIndex, meldMatch.endIndex) as MahjongTile[];
        currentMatches += meldMatch.numbers.length;
        continue;
      }

      // Jokers are only allowed in identical melds of 3 or more
      const isIdentical = numbers.split("").every((c) => c === numbers[0]);
      const canUseJokers = isIdentical && numbers.length >= 3;

      // Attempt to fulfill each character in the string in order
      for (const char of numbers) {
        // Get the matching tile index in player's hand to fulfill this requirement
        let foundIndex = availableTiles.findIndex((t) => {
          // Zeros, flowers, winds ignore mapped suit
          if (char === "0") return t.suit === DOTS && t.number === "D";
          if (char === "F") return t.suit === FLOWER_SUIT;
          if (["N", "E", "W", "S"].includes(char)) return t.number === char;
          // Numbers and other dragons must match the mapped suit
          return String(t.number) === char && t.suit === suit;
        });
        // Fallback to Jokers if allowed
        if (foundIndex === -1 && canUseJokers) {
          foundIndex = availableTiles.findIndex((t) => t.suit === JOKER_SUIT);
        }
        // If we got something to match, add it
        if (foundIndex !== -1) {
          currentAssignment[i].push(availableTiles.splice(foundIndex, 1)[0]);
          currentMatches++;
        }
      }
    }

    // If we didn't use all the exposed melds, then this is not a match
    if (availableMelds.length > 0) currentMatches = 0;

    // Save this assignment layout if it's the best we found so far
    if (currentMatches > bestMatches) {
      bestMatches = currentMatches;
      bestAssignment = currentAssignment;
      bestLeftovers = availableTiles;
    }
  }

  // Return the best one we found
  return {
    matches: bestMatches,
    assignedMelds: bestAssignment,
    leftoverTiles: bestLeftovers,
  };
};
