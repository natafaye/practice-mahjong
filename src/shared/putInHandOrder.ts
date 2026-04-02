import { matchTilesToHand } from "./matchTilesToHand";
import { sortTiles } from "./sortTiles";
import type { MahjongHand, MahjongTile, MahjongTileRow } from "../types";
import { GAP } from "../constants";

/**
 * Takes a set of tiles and puts it in order to match a particular hand, with leftovers at the end
 */
export const putInHandOrder = (tiles: MahjongTile[], hand: MahjongHand) => {
  const { assignedMelds, leftoverTiles } = matchTilesToHand(tiles, hand);
  const newRow: MahjongTileRow = [];

  const nonEmptyMelds = assignedMelds.filter((meld) => meld.length > 0);

  // Lay out the matched sets, putting a GAP between each sequence
  newRow.push();
  for (let i = 0; i < nonEmptyMelds.length; i++) {
    newRow.push(...nonEmptyMelds[i], GAP);
  }

  // Add leftover tiles
  if (leftoverTiles.length) {
    newRow.push(GAP);
    leftoverTiles.sort(sortTiles);
    newRow.push(...leftoverTiles);
  }

  return newRow;
};