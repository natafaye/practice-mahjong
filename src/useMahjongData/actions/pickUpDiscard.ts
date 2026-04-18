import { JOKER_SUIT, MELDING } from "../../constants";
import type { MahjongGameData } from "../../types";

type Payload = {
  playerIndex: number
}

export const pickUpDiscard = (state: MahjongGameData, { playerIndex }: Payload) => {
  // Can't pick up discard if it's empty, a joker, not discard pick up time, or not your turn to call
  if (state.discard.length === 0
    || state.discard.at(-1)!.suit === JOKER_SUIT
    || state.gameState !== "DISCARD"
    || state.callingPlayer !== playerIndex
  ) return state;
  // Take the latest tile from the discard and add it to the melding tiles
  const pickedTile = state.discard.at(-1)!;
  return {
    ...state,
    discard: state.discard.slice(0, -1),
    melding: [pickedTile],
    gameState: MELDING,
  };
};
