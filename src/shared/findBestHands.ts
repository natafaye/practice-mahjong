import type { MahjongHand, MahjongPlayer } from "../types";
import { matchTilesToHand } from "./matchTilesToHand";

export const findBestHands = (player: MahjongPlayer, hands: MahjongHand[]) => {
    let bestHand = undefined
    let bestMatchData = undefined
    // Loop through all the hands and get the best match
    for(const hand of hands) {
        const matchData = matchTilesToHand(player.unexposed, player.exposed, hand)
        // If we found a perfect match, no more checking needed
        if(matchData.matches === 14) return { ...matchData, hand }
        // Value of the hand breaks a tied match
        if(matchData.matches >= (bestMatchData?.matches || 0) && hand.value > (bestHand?.value || 0)) {
            bestMatchData = matchData
            bestHand = hand
        }
    }
    // There should always be something in bestMatchData and bestHand if there's at least one hand
    return { ...bestMatchData, hand: bestHand }
}