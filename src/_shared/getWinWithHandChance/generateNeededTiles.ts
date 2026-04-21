import type { MahjongPlayer } from "../../types";
import type { ExactMeld } from "../getExactMeldCombinations";
import { getExposedMelds } from "../getExposedMelds";
import { meldCharacterToKey, tileToKey } from "./getUnseenTileCounts";

type NeededData = {
  tileKey: string;
  totalNeeded: number;
  nonCallable: number;
  callable: number;
};

/**
 * Loop over all the melds for this exact suit/number melds combo and get the needed tiles grouped by key
 * Minus any tiles in the player's exposed melds or concealed tiles
 * If there are leftover melds then this exact meld combo is no good, and false is returned
 */
export const generateNeededTiles = (
  exactMelds: ExactMeld[],
  player: MahjongPlayer,
) => {
  const neededTiles: Map<string, NeededData> = new Map();
  const unusedMelds = getExposedMelds(player.exposed);

  // Check every meld in the hand ("FFF" then "2468" then "FFF" then "2222", etc)
  for (const { numbers, suit } of exactMelds) {

    // If the user has an exposed meld that matches, go to the next meld
    const meldIndex = unusedMelds.findIndex((meld) => meld.suit === suit && meld.numbers === numbers);
    if (meldIndex !== -1) {
      unusedMelds.splice(meldIndex, 1);
      continue;
    }

    // Loop through every character ("2") in the string of numbers ("2468")
    for (const meldCharacter of numbers) {
      const neededKey = meldCharacterToKey(meldCharacter, suit);
      // Either add to neededTiles data that's already there or create one
      let record = neededTiles.get(neededKey);
      if (!record) {
        record = {
          tileKey: neededKey,
          totalNeeded: 0,
          nonCallable: 0,
          callable: 0,
        };
        neededTiles.set(neededKey, record);
      }
      // Increment non-callable count if this tile is non-callable
      const isCallable = numbers.split("").every((c) => c === numbers[0]) && numbers.length >= 3;
      if (isCallable) record.callable++;
      // Increment total amount needed of this tile (including non-callable)
      record.totalNeeded++;
    }
  }

  // If there are leftover melds the player has made, then return false
  if(unusedMelds.length) return false

  // Remove from neededTiles any tiles the player already has (non-callable first)
  for (const tile of player.concealed) {
    const tileKey = typeof tile !== "string" ? tileToKey(tile) : tile;
    const neededData = neededTiles.get(tileKey);
    // If this tile isn't needed, move on to the next one
    if (!neededData) continue;
    // Cover non callable first since they're harder to get
    if (neededData.nonCallable) neededData.nonCallable--;
    neededData.totalNeeded--;
    // If that was all we needed of this tile then delete this data
    if (neededData.totalNeeded === 0) neededTiles.delete(tileKey);
  }

  return Array.from(neededTiles.values());
};
