import type { MahjongHand, MahjongPlayer, MatchData } from "../types";
import { matchTilesToHand } from "./matchTilesToHand";

const bestHandCache = new Map<string, { hand: MahjongHand } & MatchData>();

const getCacheKey = (player: MahjongPlayer) => {
  const concealed = player.concealed.filter((t) => typeof t !== "string").map((t) => t.id).sort().join(",");
  const exposed = player.exposed.map(t => typeof t !== "string" ? t.id : t).join(",")
  return `${concealed}|${exposed}`
};

export const findBestHand = (player: MahjongPlayer, hands: MahjongHand[]) => {
  // Check the cache first
  const cacheKey = getCacheKey(player)
  if(bestHandCache.has(cacheKey)) {
    console.log("used cache")
    return bestHandCache.get(cacheKey)!
  }

  let bestHand: MahjongHand | undefined = undefined;
  let bestMatchData: MatchData | undefined = undefined;
  // Loop through all the hands and get the best match
  for (const hand of hands) {
    const matchData = matchTilesToHand(player.concealed, player.exposed, hand);
    // If we found a perfect match, no more checking needed
    if (matchData.matches === 14) return { ...matchData, hand };
    // Value of the hand breaks a tied match
    if (
      !bestMatchData ||
      !bestHand ||
      matchData.matches > bestMatchData.matches ||
      (matchData.matches === bestMatchData.matches && hand.value > bestHand.value)
    ) {
      bestMatchData = matchData;
      bestHand = hand;
    }
  }
  // There should always be something in bestMatchData and bestHand if there's at least one hand
  const results = { ...bestMatchData!, hand: bestHand! }
  // Save this to the cache
  bestHandCache.set(cacheKey, results)
  return results;
};

export const clearBestHandCache = () => {
  bestHandCache.clear()
}
