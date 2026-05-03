import { getDrawingChance } from "./getDrawingChance";
import { getNeededTiles } from "./getNeededTiles";
import { getUnseenTileCounts } from "./getUnseenTileCounts";
import type { MahjongGameData, MahjongHand } from "../../types";
import { JOKER_SUIT } from "../../constants";
import { getExactMeldCombinations } from "../getExactMeldCombinations";
import { generateCombosForPlayerJokers } from "./generateCombosForPlayerJokers";

/**
 * Calculates the chance (0 to 1) that a player will be able to win with a given hand
 * Returns that chance (0 to 1) and the exact meld combo that gives that chance
 */
export const getWinWithHandChance = (hand: MahjongHand, gameData: MahjongGameData, playerIndex: number) => {
  const player = gameData.players[playerIndex];

  // Get the number of unseen tiles there are of each tile and the total count of them
  // TODO: Move up?
  const [unseenTileCounts, totalUnseenTiles] = getUnseenTileCounts(gameData.players, playerIndex, gameData.discard);

  // If hand must be concealed but this player has exposed tiles, then it's impossible
  if (hand.concealed && player.exposed.length > 0) return { chance: 0, hand: null };

  // Approximate how many turns this player has left (but calling can throw this all off)
  const leftovers = gameData.wall.length % gameData.players.length;
  const distanceToPlayer = (playerIndex - gameData.currentPlayer + gameData.players.length) % gameData.players.length;
  const getsExtraTurn = distanceToPlayer < leftovers;
  const turnsLeft = Math.floor(gameData.wall.length / gameData.players.length) + (getsExtraTurn ? 1 : 0);

  // Count how many jokers this player has
  const playerJokerCount = player.concealed.filter(
    (tile) => typeof tile !== "string" && tile.suit === JOKER_SUIT,
  ).length;

  // Loop through every combination of suits and numbers that satisfy this hand's melds
  // and get the best chance among all the possible exact hand combinations
  const exactHandCombos = getExactMeldCombinations(hand);
  let bestChance = 0;
  let bestExactHand = exactHandCombos[0];
  for (const exactHand of exactHandCombos) {
    // Get the tiles still needed to complete this combination (no jokers used yet)
    const neededTilesBeforeJokers = getNeededTiles(exactHand, player);

    // If there are exposed melds that don't match this exact hand, move on to next one
    if (!neededTilesBeforeJokers) continue;

    // Get all possible joker substitutions of this exact hand and loop through them
    const neededTilesCombos = generateCombosForPlayerJokers(neededTilesBeforeJokers, playerJokerCount);
    for (const neededTiles of neededTilesCombos) {
      // If we have every tile we need, there's 100% chance and we're never going to find better
      if (neededTiles.length === 0) return { chance: 1, hand: exactHand };

      // If we don't have everything we need, what's the chance we draw everything we need
      const drawingChance = getDrawingChance(neededTiles, unseenTileCounts, totalUnseenTiles, turnsLeft);

      // Update if this is the best chance so far
      const likelihood = drawingChance;
      if (likelihood > bestChance) {
        bestChance = likelihood;
        // TODO: indicate where to use jokers? Or unused tiles?
        bestExactHand = exactHand;
      }
    }
  }

  return { chance: bestChance, hand: bestExactHand };
};
