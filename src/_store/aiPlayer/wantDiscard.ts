import { JOKER_SUIT } from "../../constants";
import { findBestHand, getHandsData } from "../../_shared";
import type { MahjongGameData, MahjongPlayer } from "../../types";

/**
 * If the player doesn't want the discard, returns undefined
 * If the player DOES want the discard, returns an array of the indexes of the tiles to meld with the discard
 */
export const wantDiscard = (player: MahjongPlayer, state: MahjongGameData): undefined | { tileIndexes: number[] } => {
  const discardTile = state.discard.at(-1);
  // Can't call if it's a joker
  if (!discardTile || discardTile.suit === JOKER_SUIT) return undefined;
  const handsData = getHandsData(state.cardName);
  // Get the best hand match with the discard
  const concealedWithDiscard = [...player.concealed, discardTile];
  const bestHandWithDiscard = findBestHand({ ...player, concealed: concealedWithDiscard }, handsData.hands);
  // Call if it makes the player win
  if (bestHandWithDiscard.matches === 14) {
    // We can just return an empty array because handleGameWin will take it from here
    return { tileIndexes: [] };
  }
  // Can't call to make a meld if the hand's concealed
  if (bestHandWithDiscard.hand.concealed) return undefined;
  // Find the meld that the discard tile was assigned to in the best hand
  const meldIndex = bestHandWithDiscard.assignedMelds.findIndex((meld) => meld.some((t) => t.id === discardTile.id));
  // Don't call if it wasn't assigned to a meld, because then it's useless
  if (meldIndex === -1) return undefined;
  // Can't call if it's not a callable, complete meld
  const meldString = bestHandWithDiscard.hand.melds[meldIndex].numbers[0];
  const currentMeldTiles = bestHandWithDiscard.assignedMelds[meldIndex];
  const isCallable = meldString.length >= 3 && meldString.split("").every((c) => c === meldString[0]);
  const isComplete = currentMeldTiles.length === meldString.length;
  if (!isCallable || !isComplete) return undefined;
  // Don't call if it the player isn't better off with the discard
  const bestHandWithoutDiscard = findBestHand(player, handsData.hands);
  if (bestHandWithDiscard.matches <= bestHandWithoutDiscard.matches) return undefined;
  // Call the tile and return the indexes for the other tiles to meld with the discard
  return {
    tileIndexes: currentMeldTiles
      .filter((t) => t.id !== discardTile.id)
      .map((t) => player.concealed.findIndex((pt) => typeof pt !== "string" && pt.id === t.id)),
  };
};
