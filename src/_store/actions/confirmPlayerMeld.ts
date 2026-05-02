import { EXPOSED_GAP, PLAYING } from "../../constants";
import { checkIfMeldValid, getHandsData, putInMeldOrder } from "../../_shared";
import type { MahjongGameData } from "../../types";
import { clonePlayers } from "./clonePlayers";
import { handleGameWin } from "./handleGameWin";

type Payload = {
  playerIndex: number;
};

export const confirmPlayerMeld = (state: MahjongGameData, { playerIndex }: Payload) => {
  const handsData = getHandsData(state.cardName);
  // Can't meld if it's not your turn to call or if it isn't a valid meld
  if (state.callingPlayer !== playerIndex || !checkIfMeldValid(state.melding, handsData.callableMelds))
    return state;
  // Remove the tiles from the melding list and add them back to the player's exposed tiles
  const newPlayers = clonePlayers(state);
  // Put the melded tiles in an order that matches a valid meld
  const sortedMeld = putInMeldOrder(state.melding, handsData.melds);
  newPlayers[playerIndex].exposed.unshift(...sortedMeld, EXPOSED_GAP);
  return {
    ...state,
    players: newPlayers,
    melding: [],
    gameState: PLAYING,
    currentPlayer: playerIndex,
    // Check for a win
    ...handleGameWin({ ...state, currentPlayer: playerIndex }, newPlayers),
  };
};
