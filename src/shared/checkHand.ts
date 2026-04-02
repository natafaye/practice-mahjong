import { matchTilesToHand } from "./matchTilesToHand";
import type { MahjongHand, MahjongPlayer, MahjongTile } from "../types";

/**
 * Checks a MahjongPlayer against a MahjongHand and returns the number of matching tiles
 */
export const checkHand = (player: MahjongPlayer, hand: MahjongHand): number => {
  // Pool all of the player's physical tiles
  const allTiles = [...player.unexposed, ...player.exposed].filter(
    (t) => typeof t !== "string",
  ) as MahjongTile[];
  const result = matchTilesToHand(allTiles, hand);
  return result.matches;
};
