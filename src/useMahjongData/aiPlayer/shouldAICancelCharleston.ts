import { findBestHand } from "../../_shared";
import type { MahjongGameData, MahjongPlayer } from "../../types";

/**
 * Logic for AI to decide if they want to cancel the rest of the Charleston
 */
export const shouldAICancelCharleston = (player: MahjongPlayer, state: MahjongGameData): boolean => {
  const matchData = findBestHand(player, state.handsData.hands);
  
  // If they already have 10 matches, then they don't want to pass 3 and give up something useful
  return matchData.matches >= 10;
};
