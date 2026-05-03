import { BAMS, DOTS, CRAKS, WIND_SUIT, FLOWER_SUIT } from "../constants";
import type { MahjongHand } from "../types";

export type ExactMeld = {
  suit: string;
  numbers: string;
};

const exactMeldsCache = new Map<string, ExactMeld[][]>()

// These suits in a CARD don't get mapped by G, R, B they stay as they are
const OTHER_SUITS = {
  [WIND_SUIT]: WIND_SUIT, 
  [FLOWER_SUIT]: FLOWER_SUIT,
  [DOTS]: DOTS // for zero melds like "000"
}
// G, R, B in MahjongHands can represent any arrangement of the 3 primary suits
const SUIT_PERMUTATIONS = [
  { G: BAMS, R: CRAKS, B: DOTS, ...OTHER_SUITS },
  { G: BAMS, R: DOTS, B: CRAKS, ...OTHER_SUITS },
  { G: CRAKS, R: BAMS, B: DOTS, ...OTHER_SUITS },
  { G: CRAKS, R: DOTS, B: BAMS, ...OTHER_SUITS },
  { G: DOTS, R: BAMS, B: CRAKS, ...OTHER_SUITS },
  { G: DOTS, R: CRAKS, B: BAMS, ...OTHER_SUITS },
];

/**
 * Turns a non-specific meld into an array of all the exact combinations of suits and numbers
 * Non specific: 1111 FFFFFF 2222, Any 1 Suit, Any 2 Consecutive Numbers
 * Exact: 3333(dots) FFFFFF(flowers) 2222(dots)
 */
export const getExactMeldCombinations = (hand: MahjongHand): ExactMeld[][] => {
  // Check the cache first
  if(exactMeldsCache.has(hand.id)) return exactMeldsCache.get(hand.id)!

  const exactCombinationsSet = new Set<string>();
  const results: ExactMeld[][] = [];

  if (hand.melds.length === 0) return [];

  // Check every combo of suits (G is BAMS or G is CRAKS, etc)
  for (const suitMap of SUIT_PERMUTATIONS) {
    // Check every combo of numbers (222 or 444 or 666 for an even meld of 3, etc)
    // Loop for the maximum number of options any meld has (for example, there are 4 options for any even: 2, 4, 6 or 8)
    const maxOptions = Math.max(...hand.melds.map((s) => s.numbers.length));
    for (let i = 0; i < maxOptions; i++) {
      // The melds with exact numbers and suits (instead of "any even in same suit", it's "Dot 4s")
      const exactMelds = hand.melds.map((meld) => {
        // If the meld has this index, use it, if not it's a meld that never changes so use index 0
        const numbers = meld.numbers[i] !== undefined ? meld.numbers[i] : meld.numbers[0];
        // Map the generic suit "R" to a specific suit "Dots" (leave Winds and Flowers and zeros as is)
        const suit = suitMap[meld.suit];
        return { suit, numbers };
      });

      const comboKey = JSON.stringify(exactMelds);
      if (!exactCombinationsSet.has(comboKey)) {
        exactCombinationsSet.add(comboKey);
        results.push(exactMelds);
      }
    }
  }

  // Save to cache
  exactMeldsCache.set(hand.id, results)

  return results;
};