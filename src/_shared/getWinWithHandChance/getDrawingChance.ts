import { generateCombosForDrawingJokers } from "./generateCombosForDrawingJokers";

export type NeededData = {
  tileKey: string;
  totalNeeded: number;
  nonCallable: number;
  callable: number;
};

/**
 * Calculate the chance of drawing all the tiles needed before the game ends (0 to 1)
 */
export const getDrawingChance = (
  // The tiles this player still needs to complete this hand (player's jokers already substituted)
  neededTiles: NeededData[],
  // How many of each tile haven't been seen yet
  unseenTileCounts: Map<string, number>,
  // The number of all the counts in unseenTileCounts added together (the wall + all other player's concealed tiles)
  totalUnseenTiles: number,
  // Light estimate of how many turns for this player left (calling will bump this up and down so it's just an estimate)
  thisPlayerTurnsLeft: number,
) => {
  let drawingChance = 0;
  // If we need more tiles than there are even turns left then there's probably a 0% chance of drawing
  // (calling could make this possible by changing how many turns this player gets, but we'll just estimate it at 0)
  if (neededTiles.reduce((total, tile) => (total += tile.totalNeeded), 0) > thisPlayerTurnsLeft) return 0;
  // For all possible substitutions of drawing jokers
  // We need to add the probability for each one to the drawingChance,
  // since every possible drawing/using joker combo is another way to win
  let unseenJokerCount = unseenTileCounts.get("JOKER_") || 0;
  const drawingJokerCombos = generateCombosForDrawingJokers(neededTiles, unseenJokerCount);
  for (const neededTilesJokerCombo of drawingJokerCombos) {
    let jokerComboChance = 1;
    let totalAvailable = 0;
    let totalNeeded = 0;
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
      // Add to totals for later calculations
      totalAvailable += available;
      totalNeeded += needed;
      // Multiply in the chance of drawing the right number of these tiles
      jokerComboChance *= nCr(available, needed);
    }
    // If we found a meld that's dead, this joker combo is dead, check the next one
    if (jokerComboDead) continue;
    // Multiply in the nCr of drawing the right number of wrong tiles (aka it's great to miss on extra turns)
    jokerComboChance *= nCr(totalUnseenTiles - totalAvailable, thisPlayerTurnsLeft - totalNeeded);
    // Divide by the total
    jokerComboChance /= nCr(totalUnseenTiles, thisPlayerTurnsLeft);
    // Add this combo's chance to the total chance of drawing what you need in any unseen joker combo
    drawingChance += jokerComboChance;
  }
  // Return the total chance of drawing the tiles needed (including drawing jokers)
  return drawingChance;
};

// TODO: Cache nCr results
//const nCrCache = new Map<string, number>()

/**
 * Combination nCr probability function
 */
const nCr = (n: number, r: number) => {
  //if(nCrCache.has(`${n}_${r}`)) return nCrCache.get(`${n}_${r}`)
  if (r > n || r < 0) return 0;
  let res = 1;
  for (let i = 1; i <= r; i++) {
    res = (res * (n - i + 1)) / i;
  }
  //nCrCache.set(`${n}_${r}`, res)
  return res;
};
