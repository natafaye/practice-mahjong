import { Chance } from "chance";
import type { MahjongGameData, MahjongPlayer } from "../../types";
import { findBestHand, getHandsData } from "../../_shared";

export const pickDiscardIndexes = (
  player: MahjongPlayer,
  amount: number = 1,
  state: MahjongGameData,
  isAmountVariable: boolean = false,
) => {
  // Get the best hand for these tiles
  const bestHandData = findBestHand(player, getHandsData(state.cardName).hands);
  // Try to get the tiles to discard from the leftover tiles
  const discardIndexes = bestHandData.leftoverTiles.slice(0, amount).map((tile) => player.concealed.indexOf(tile));
  // If we have to discard something we need, just grab it randomly
  // TODO: Improve by discarding from non-pairs first or calculating win percentage for each discard
  // Perhaps not worth optimizing because it's a rare occurence?
  const chance = new Chance(state.seed);
  while (discardIndexes.length < amount && !isAmountVariable) {
    const index = chance.integer({ min: 0, max: player.concealed.length - 1 });
    if (!discardIndexes.includes(index)) discardIndexes.push(index);
  }
  return discardIndexes;
};
