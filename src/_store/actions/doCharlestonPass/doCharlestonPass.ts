import { BLIND_PASS, CHARLESTONS, COURTESY_PASS, PASSING_GAPS, PLAYING } from "../../../constants";
import type { MahjongGameData } from "../../../types";
import { clonePlayers } from "../clonePlayers";
import { shuffleArray } from "../../generate/shuffleArray";
import { addWallPass } from "./addWallPass";
import { balanceBlindPass } from "./balanceBlindPass";
import { balanceCourtesyPass } from "./balanceCourtesyPass";
import { getGiveToIndex } from "./getGiveToIndex";

/**
 * Handle one pass of the Charleston and return an updated copy of the state
 * (The passing array needs to be pre-filled with everyone's passes)
 */
export const doCharlestonPass = (state: MahjongGameData): MahjongGameData => {
  const passing = state.passing.map((p) => [...p]);
  const newPlayers = clonePlayers(state);
  let newWall = [...state.wall];
  const [direction, type] = state.gameState.split("_");
  // For 3-player or 1-player, have the wall stand in as a player
  if (passing.length === 3 || passing.length === 1) addWallPass(passing, newWall);
  // Balance Blind or Courtesy Pass (which allows passing less than 3)
  if (type === BLIND_PASS) balanceBlindPass(passing, direction);
  if (type === COURTESY_PASS) balanceCourtesyPass(passing, direction);
  // Loop over the players (and potentially the wall) and pass their tiles
  for (let takeFromIndex = 0; takeFromIndex < passing.length; takeFromIndex++) {
    // Get the index of where this player's tiles will go
    const giveToIndex = getGiveToIndex(direction, takeFromIndex, passing.length);
    // If we're at an index off the end of the player's array, this is the wall
    if (giveToIndex === newPlayers.length) {
      // Give the wall its tiles and shuffle
      newWall.push(...passing[takeFromIndex]);
      newWall = shuffleArray(newWall, state.seed);
    } else {
      // Put the passed tiles into the passing gaps left
      passing[takeFromIndex].forEach((tile, index) => {
        const concealed = newPlayers[giveToIndex].concealed;
        // Find the next passing gap and replace the gap with a tile
        // As long as players are always receiving as many tiles as they gave
        // there should be the correct number of passing gaps available to be filled
        const gapIndex = concealed.indexOf(PASSING_GAPS[index]);
        concealed[gapIndex] = tile;
      });
    }
  }
  return {
    ...state,
    players: newPlayers,
    wall: newWall,
    passing: state.players.map(() => []),
    readyToPass: state.players.map(() => false),
    gameState: CHARLESTONS[CHARLESTONS.indexOf(state.gameState) + 1] || PLAYING,
  };
};
