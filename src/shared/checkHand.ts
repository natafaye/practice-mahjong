import { matchTilesToHand } from "./matchTilesToHand";
import type { MahjongHand, MahjongPlayer } from "../types";

/**
 * Checks a MahjongPlayer against a MahjongHand and returns the number of matching tiles
 */
export const checkHand = (player: MahjongPlayer, hand: MahjongHand): number => {
  const result = matchTilesToHand(player.concealed, player.exposed, hand);
  return result.matches;
};
