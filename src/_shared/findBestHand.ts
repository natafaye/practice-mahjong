import type { MahjongHand, MahjongPlayer, MatchData } from "../types";
import { matchTilesToHand } from "./matchTilesToHand";

export const findBestHand = (player: MahjongPlayer, hands: MahjongHand[]) => {
  let bestHand: MahjongHand | undefined = undefined;
  let bestMatchData: MatchData | undefined = undefined;
  // Loop through all the hands and get the best match
  for (const hand of hands) {
    const matchData = matchTilesToHand(player.concealed, player.exposed, hand);
    // If we found a perfect match, no more checking needed
    if (matchData.matches === 14) return { ...matchData, hand };
    // Value of the hand breaks a tied match
    if (!bestMatchData || !bestHand || 
      matchData.matches > bestMatchData.matches ||
      (matchData.matches === bestMatchData.matches && hand.value > bestHand.value)
    ) {
      bestMatchData = matchData;
      bestHand = hand;
    }
  }
  // There should always be something in bestMatchData and bestHand if there's at least one hand
  return { ...bestMatchData!, hand: bestHand! };
};
