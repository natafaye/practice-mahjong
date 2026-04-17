import { useEffect, useRef } from "react";
import { pickDiscardIndex } from "./pickDiscardIndex";
import { lookForJokerSwap } from "./lookForJokerSwaps";
import useMahjongData from "../useMahjongData";
import { CHARLESTONS, DISCARD_AI, DRAWING, PLAYING, THIS_PLAYER } from "../constants";

export default function useAIPlayer(thinkTime: number, onJokerSwap?: (tileId: string) => void) {
  const { gameState, currentPlayer, players, readyToPass, dispatch } = useMahjongData();
  const thinking = useRef(false);

  useEffect(() => {
    // If we're already thinking, let that finish
    if (thinking.current) return;
    // Check if the AI wants to call a discard
    if (gameState === DISCARD_AI) {
      thinking.current = true;
      // Have all the AI players check if they want the discard

      // Go to the next turn and move to the playing phase
      dispatch({ type: "SKIP_DISCARD_AI" });
      thinking.current = false;
    } else if(CHARLESTONS.includes(gameState)) {
      // AI picks tiles to pass and marks itself ready
      for(let playerIndex = 0; playerIndex < players.length; playerIndex++) {
        // Don't pass if you're already ready to pass or it's the human player
        if(playerIndex === THIS_PLAYER || readyToPass[playerIndex]) continue;
        dispatch({
          type: "ADD_TO_PASS",
          payload: { playerIndex, tileIndexes: [0, 1, 2] },
        });
        dispatch({
          type: "MARK_READY_TO_PASS",
          payload: { playerIndex }
        })
      }
    } else if (gameState === DRAWING && currentPlayer !== THIS_PLAYER) {
      // AI draws a tile
      (async () => {
        thinking.current = true;
        // Draw a tile from the wall
        await new Promise((resolve) => setTimeout(resolve, thinkTime));
        dispatch({
          type: "DRAW_FROM_WALL",
          payload: { playerIndex: currentPlayer },
        });
        thinking.current = false;
      })();
    } else if (gameState === PLAYING && currentPlayer !== THIS_PLAYER) {
      // AI tries to swap a joker or discard a tile
      (async () => {
        thinking.current = true;
        // Check for any joker substitutions and do as many as you can
        const jokerSwapInfo = lookForJokerSwap(players, currentPlayer);
        if (jokerSwapInfo) {
          const swapTile = players[jokerSwapInfo.sourcePlayerIndex].concealed[jokerSwapInfo.sourceTileIndex];
          if (typeof swapTile !== "string") {
            onJokerSwap?.(swapTile.id);
          }
          await new Promise((resolve) => setTimeout(resolve, thinkTime));
          dispatch({ type: "JOKER_SWAP", payload: jokerSwapInfo });
          // Return and when this effect runs again we can check for a joker swap again or discard
          thinking.current = false;
          return;
        }
        // Discard a tile if we didn't find a joker swap
        await new Promise((resolve) => setTimeout(resolve, thinkTime));
        dispatch({
          type: "DISCARD_TILE",
          payload: {
            playerIndex: currentPlayer,
            tileIndex: pickDiscardIndex(players[currentPlayer]),
          },
        });
        thinking.current = false;
      })();
    }
  }, [currentPlayer, gameState, players, thinkTime, dispatch, onJokerSwap, readyToPass]);
}
