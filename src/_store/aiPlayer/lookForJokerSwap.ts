import type { MahjongHand, MahjongPlayer } from "../../types";
import { findBestHand, getJokerSwapIndex } from "../../_shared";

export const lookForJokerSwap = (
  players: MahjongPlayer[],
  currentPlayer: number,
  hands: MahjongHand[]
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
        // If the player is worse off with the joker instead, don't make the swap
        // (like if they need that tile for a pair or run)
        const bestHandBeforeSwap = findBestHand(players[currentPlayer], hands)
        const concealedWithSwap = [...players[currentPlayer].concealed]
        concealedWithSwap[tileIndex] = players[playerIndex].exposed[jokerIndex]
        const playerWithSwap = { ...players[currentPlayer], concealed: concealedWithSwap }
        const bestHandAfterSwap = findBestHand(playerWithSwap, hands)
        if(bestHandBeforeSwap.matches > bestHandAfterSwap.matches) continue;
        // Else if they're not worse off, make the swap
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
