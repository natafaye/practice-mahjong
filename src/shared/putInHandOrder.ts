import { matchTilesToHand } from "./matchTilesToHand";
import { sortTiles } from "./sortTiles";
import type { MahjongHand, MahjongPlayer, MahjongTileRow } from "../types";
import { EXPOSED_GAP } from "../constants";

/**
 * Takes a set of tiles and puts it in order to match a particular hand, with leftovers at the end
 */
export const putInHandOrder = (player: MahjongPlayer, hand: MahjongHand) => {
  const { assignedMelds, leftoverTiles } = matchTilesToHand(player.unexposed, player.unexposed, hand);
  const newRow: MahjongTileRow = [];

  const nonEmptyMelds = assignedMelds.filter((meld) => meld.length > 0);

  // Lay out the matched sets, putting a EXPOSED_GAP between each sequence
  newRow.push();
  for (let i = 0; i < nonEmptyMelds.length; i++) {
    newRow.push(...nonEmptyMelds[i], EXPOSED_GAP);
  }

  // Add leftover tiles
  if (leftoverTiles.length) {
    newRow.push(EXPOSED_GAP);
    leftoverTiles.sort(sortTiles);
    newRow.push(...leftoverTiles);
  }

  return newRow;
};