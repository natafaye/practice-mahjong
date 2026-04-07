import type { MahjongPlayer } from "../types";
import { getJokerSwapIndex } from "../shared";

export const lookForJokerSwap = (
  players: MahjongPlayer[],
  currentPlayer: number,
) => {
  // Loop through each tile
  const concealed = players[currentPlayer].concealed;
  for (let tileIndex = 0; tileIndex < concealed.length; tileIndex++) {
    const tile = concealed[tileIndex];
    if (typeof tile === "string") continue;
    // Check each tile against each player's exposed tiles
    for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
      const jokerIndex = getJokerSwapIndex(
        tile,
        players[playerIndex].exposed,
      );
      if (jokerIndex !== -1) {
        return {
          sourcePlayerIndex: currentPlayer,
          sourceTileIndex: tileIndex,
          targetPlayerIndex: playerIndex,
          targetTileIndex: jokerIndex,
        };
      }
    }
  }
  return undefined
};
