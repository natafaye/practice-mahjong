import { Chance } from "chance";
import type { MahjongGameData, MahjongGap, MahjongPlayer, MahjongTile } from "../../types";
import { findBestHand, getHandsData } from "../../_shared";
import { JOKER_SUIT } from "../../constants";

export const pickDiscardIndexes = (
  player: MahjongPlayer,
  amount: number = 1,
  state: MahjongGameData,
  isAmountVariable: boolean = false,
  allowJokers: boolean = true,
) => {
  // Get the best hand for these tiles
  const bestHandData = findBestHand(player, getHandsData(state.cardName).hands);
  console.log(bestHandData.matches, bestHandData.hand.id);
  // First fill with any leftover tiles that aren't jokers
  const discardIndexes = bestHandData.leftoverTiles
    .filter((t) => typeof t !== "string" && t.suit !== JOKER_SUIT)
    .slice(0, amount)
    .map((tile) => player.concealed.indexOf(tile));
  // If we have to discard something we need, just grab it randomly
  // Perhaps not worth optimizing because it's a rare occurence?
  const chance = new Chance(state.seed);
  while (discardIndexes.length < amount && !isAmountVariable) {
    const index = chance.integer({ min: 0, max: player.concealed.length - 1 });
    // Don't add a joker if it's not allowed
    if (!discardIndexes.includes(index) && (allowJokers || !isJoker(player.concealed[index])))
      discardIndexes.push(index);
  }
  return discardIndexes;
};

const isJoker = (tile: MahjongTile | MahjongGap) => typeof tile !== "string" && tile.suit === JOKER_SUIT;
