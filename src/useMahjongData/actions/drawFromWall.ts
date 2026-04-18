import { DRAWING, GAME_OVER, PLAYING, THIS_PLAYER } from "../../constants";
import type { MahjongGameData } from "../../types";
import { clonePlayers } from "./clonePlayers";
import { handleGameWin } from "./handleGameWin";

export const drawFromWall = (state: MahjongGameData, { playerIndex } : { playerIndex: number }) => {
  // Can't draw if it's not your turn, or not the right time
  if (state.currentPlayer !== playerIndex || state.gameState !== DRAWING) return state;
  // If the wall is empty, the game is over
  if (state.wall.length === 0) {
    return {
      ...state,
      gameState: GAME_OVER,
    };
  }
  // Draw a tile from the wall and add it to the player's tiles
  const drawnTile = state.wall.at(-1)!;
  const newPlayers = clonePlayers(state);
  const concealed = newPlayers[playerIndex].concealed
  if (playerIndex === THIS_PLAYER) {
    const replacementIndex = concealed.findIndex((tile) => typeof tile === "string");
    concealed[replacementIndex] = drawnTile;
  } else {
    concealed.unshift(drawnTile);
  }
  return {
    ...state,
    wall: state.wall.slice(0, -1),
    players: newPlayers,
    gameState: PLAYING,
    // Check for a win
    ...handleGameWin(state, newPlayers),
  };
};
