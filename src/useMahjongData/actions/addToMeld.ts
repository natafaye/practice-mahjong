import { MELDING } from "../../constants";
import type { MahjongGameData } from "../../types";
import { clonePlayers } from "./clonePlayers";

type Payload = {
  playerIndex: number;
  tileIndexes: number[];
};

export const addToMeld = (
  state: MahjongGameData,
  { playerIndex, tileIndexes }: Payload,
): MahjongGameData => {
  // Can't add to meld if we're not currently melding or it's not your calling turn
  if (state.gameState !== MELDING || state.callingPlayer != playerIndex)
    return state;
  // Remove the tiles from this player's tiles and add it to the melding tiles
  const newPlayers = clonePlayers(state);
  const meldingTiles = tileIndexes
    .toSorted((a, b) => b - a)
    .flatMap((tileIndex) =>
      newPlayers[playerIndex].concealed.splice(tileIndex, 1),
    );
  // Can't meld a gap
  if (!meldingTiles.every((tile) => typeof tile !== "string")) return state;
  return {
    ...state,
    players: newPlayers,
    melding: [...state.melding, ...meldingTiles],
  };
};
