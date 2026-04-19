import { findBestHand, getHandsData } from "../../_shared";
import type { MahjongGameData, MahjongPlayer } from "../../types";

/**
 * Logic for AI to decide if they want to cancel the rest of the Charleston
 */
export const shouldAICancelCharleston = (player: MahjongPlayer, state: MahjongGameData): boolean => {
  const handsData = getHandsData(state.cardName);
  const matchData = findBestHand(player, handsData.hands);
  
  // If the AI already has 10 or more matches for their best hand, they probably want to stop
  // and keep what they have rather than risk passing away something useful
  return matchData.matches >= 10;
};
