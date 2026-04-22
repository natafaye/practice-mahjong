import { generateCombosForDrawingJokers } from "./generateCombosForDrawingJokers";
import { lnnCr } from "./lnnCr";

export type NeededData = {
  tileKey: string;
  totalNeeded: number;
  nonCallable: number;
  callable: number;
};

/**
 * Calculate the chance of drawing all the tiles needed before the game ends (0 to 1)
 * (includes the possibility of drawing jokers)
 */
export const getDrawingChance = (
  // The tiles this player still needs to complete this hand (player's jokers already substituted)
  neededTiles: NeededData[],
  // How many of each tile haven't been seen yet
  unseenTileCounts: Map<string, number>,
  // The number of all the counts in unseenTileCounts added together
  // (the wall + all other player's concealed tiles)
  totalUnseenTiles: number,
  // Light estimate of how many turns for this player left
  // (calling will bump this up and down so it's just an estimate)
  thisPlayerTurnsLeft: number,
) => {
  let drawingChance = 0;

  // If there probably isn't enough turns, then there's a 0% chance
  const totalNeeded = neededTiles.reduce((total, tile) => total + tile.totalNeeded, 0);
  if (totalNeeded > thisPlayerTurnsLeft) return 0;

  // Calculate the denominator once (Total ways to draw x tiles from y unseen tiles)
  const logDenominator = lnnCr(totalUnseenTiles, thisPlayerTurnsLeft);

  // Calculate the numerator by adding all the possibilities together
  // For all possible substitutions of drawing jokers
  let unseenJokerCount = unseenTileCounts.get("JOKER_") || 0;
  const drawingJokerCombos = generateCombosForDrawingJokers(neededTiles, unseenJokerCount);
  for (const neededTilesJokerCombo of drawingJokerCombos) {
    let jokerComboNumerator = 0;
    let totalAvailable = 0;
    let jokerComboDead = false;

    // For each meld/tile that we need a certain number of (like maybe we need four Flowers)
    for (const neededTile of neededTilesJokerCombo) {
      const available = unseenTileCounts.get(neededTile.tileKey) || 0;
      const needed = neededTile.totalNeeded;

      // If there isn't enough this meld is dead which means this joker combo is dead
      if (needed > available) {
        jokerComboDead = true;
        break;
      }

      // Add to total for later 
      totalAvailable += available;
      // Add the chance of drawing the right number of this tile
      jokerComboNumerator += lnnCr(available, needed);
    }
    // If we found a meld that's dead, this joker combo is dead, check the next one
    if (jokerComboDead) continue;

    // How many ways can we pick a tile for the remaining turns, because all of them are fine
    // (since we already got everything we needed)
    const remainingTurns = thisPlayerTurnsLeft - totalNeeded;
    const remainingUnseenOtherTiles = totalUnseenTiles - totalAvailable;
    jokerComboNumerator += lnnCr(remainingUnseenOtherTiles, remainingTurns);
    
    // Divide the numerator by the denominator and take out of logarithmic space
    drawingChance += Math.exp(jokerComboNumerator - logDenominator);
  }
  return drawingChance;
};
