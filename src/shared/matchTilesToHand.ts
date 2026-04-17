import { BAMS, CRAKS, DOTS, FLOWER_SUIT, JOKER_SUIT } from "../constants";
import type {
  MahjongHand,
  MahjongHandMeld,
  MahjongTile,
  MahjongTileRow,
} from "../types";
import { convertTileToCharacter } from "./utilities";

// G, R, B can represent any arrangement of the 3 primary suits
const SUIT_PERMUTATIONS = [
  { G: BAMS, R: CRAKS, B: DOTS },
  { G: BAMS, R: DOTS, B: CRAKS },
  { G: CRAKS, R: BAMS, B: DOTS },
  { G: CRAKS, R: DOTS, B: BAMS },
  { G: DOTS, R: BAMS, B: CRAKS },
  { G: DOTS, R: CRAKS, B: BAMS },
];

/**
 * Figure out the best way to match these tiles to this hand
 */
export const matchTilesToHand = (
  concealedTiles: MahjongTileRow,
  exposedTiles: MahjongTileRow,
  hand: MahjongHand,
) => {
  // Fail immediately if the hand must be concealed but has exposed melds
  if (hand.concealed && exposedTiles.length > 0) {
    return { matches: 0, assignedMelds: [], leftoverTiles: concealedTiles };
  }

  let bestMatches = -1;
  let bestAssignment: MahjongTile[][] = [];
  let bestLeftovers: MahjongTile[] = [];
  const meldStringCombos = getCombinations(hand.melds);
  const concealedOnlyTiles = concealedTiles.filter((t) => typeof t !== "string") as MahjongTile[];
  const exposedMelds = getExposedMelds(exposedTiles);

  // Check every combo of suits (G is BAMS or G is CRAKS, etc)
  for (const suitMap of SUIT_PERMUTATIONS) {
    // Check every combo of melds (222 or 444 or 666 for an even meld of 3, etc)
    for (const combo of meldStringCombos) {
      let currentMatches = 0;
      const availableTiles = [...concealedOnlyTiles];
      const availableMelds = [...exposedMelds];
      const currentAssignment: MahjongTile[][] = hand.melds.map(() => []);

      // Check every meld in the hand ("FFFF" then "1111" then "22" then "3333", etc)
      for (let i = 0; i < hand.melds.length; i++) {
        const reqString = combo[i]; // example: "222"
        const rawSuit = hand.melds[i].suit; // example: "G"
        const mappedSuit = suitMap[rawSuit]; // example: DOTS

        // Check for already exposed tiles first and take those if you find it
        const meldMatch = availableMelds.find((meld) => meld.suit === mappedSuit && meld.numbers === reqString);
        if (meldMatch) {
          availableMelds.splice(availableMelds.indexOf(meldMatch), 1);
          currentAssignment[i] = exposedTiles.slice(
            meldMatch.startIndex,
            meldMatch.endIndex,
          ) as MahjongTile[];
          currentMatches += meldMatch.numbers.length;
          continue;
        }

        // Jokers are only allowed in identical melds of 3 or more
        const isIdentical = reqString
          .split("")
          .every((c) => c === reqString[0]);
        const canUseJokers = isIdentical && reqString.length >= 3;

        // Attempt to fulfill each character in the string in order
        for (const char of reqString) {
          // Get the matching tile index in player's hand to fulfill this requirement
          let foundIndex = availableTiles.findIndex((t) => {
            // Zeros, flowers, winds ignore mapped suit
            if (char === "0") return t.suit === DOTS && t.number === "D";
            if (char === "F") return t.suit === FLOWER_SUIT;
            if (["N", "E", "W", "S"].includes(char)) return t.number === char;
            // Numbers and other dragons must match the mapped suit
            return String(t.number) === char && t.suit === mappedSuit;
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
  }

  // Return the best one we found
  return {
    matches: bestMatches,
    assignedMelds: bestAssignment,
    leftoverTiles: bestLeftovers,
  };
};

/**
 * Generates all possible string combinations for a hand's melds (to handle any pair, any matching evens, any run, etc)
 */ 
const getCombinations = (melds: MahjongHandMeld[]): string[][] => {
  if (melds.length === 0) return [];
  // Find the maximum number of options any meld has (for example, 4 for any even, or 6 for a run of 3)
  const maxOptions = Math.max(...melds.map((s) => s.numbers.length));
  const combos: string[][] = [];
  // Iterate through the options
  for (let i = 0; i < maxOptions; i++) {
    const currentCombo = melds.map((meld) => {
      // If the meld has this index, use it, if not it's a meld that never changes so use index 0
      return meld.numbers[i] !== undefined ? meld.numbers[i] : meld.numbers[0];
    });
    combos.push(currentCombo);
  }
  return combos;
};

/**
 * Get the exposed melds in a way that matches MahjongHands
 */
const getExposedMelds = (exposedTiles: MahjongTileRow) => {
  let currentMeld = {
    numbers: "",
    suit: "",
    character: "",
    startIndex: 0,
    endIndex: 0,
  };
  const exposedMelds = [] as Array<typeof currentMeld>;
  exposedTiles.forEach((tile, index) => {
    if (typeof tile !== "string") {
      let char = convertTileToCharacter(tile);
      if (char === "J") {
        char = currentMeld.character;
      } else {
        currentMeld.character = char;
        currentMeld.suit = tile.suit;
      }
      currentMeld.numbers += char;
    } else {
      currentMeld.endIndex = index;
      exposedMelds.push(currentMeld);
      currentMeld = {
        numbers: "",
        suit: "",
        character: "",
        startIndex: index + 1,
        endIndex: index + 1,
      };
    }
  });
  return exposedMelds;
};
