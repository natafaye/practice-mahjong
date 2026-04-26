import type { NeededData } from "./getDrawingChance";

/**
 * Take a starting set of needed tiles and distribute the player's jokers amongst them
 * in all possible combinations and return the neededTiles for each combination
 */
export const generateCombosForPlayerJokers = (neededTiles: NeededData[], playerJokerCount: number) => {
  const results: NeededData[][] = [];
  // Calculate how many jokers to use
  const totalCallable = neededTiles.reduce((sum, tile) => sum + tile.callable, 0);
  const jokersToUse = Math.min(playerJokerCount, totalCallable);

  // Helper function to distribute jokers recursively
  const distribute = (index: number, remainingJokers: number, currentCombo: NeededData[]) => {
    // If we've distributed all the jokers then save this distribution
    if (remainingJokers === 0) {
      results.push([...currentCombo, ...neededTiles.slice(index)]);
      return;
    }
    // Else if we got to the end without using them all then just leave
    if (index === neededTiles.length) return;

    // Try using j jokers for this tile (0 to maxForThisTile)
    const tile = neededTiles[index];
    const maxForThisTile = Math.min(remainingJokers, tile.callable);
    for (let j = 0; j <= maxForThisTile; j++) {
      const updatedTile: NeededData = {
        ...tile,
        totalNeeded: tile.totalNeeded - j,
        callable: tile.callable - j,
      };
      const nextCombo = [...currentCombo]
      // If we don't need this tile at all anymore, don't include it in this combo of neededTiles
      if(updatedTile.totalNeeded !== 0) nextCombo.push(updatedTile)

      distribute(index + 1, remainingJokers - j, nextCombo);
    }
  };

  distribute(0, jokersToUse, []);

  return results;
};
