import { GAME_OVER } from "../constants"
import { putInHandOrder } from "../shared"
import { findBestHand } from "../shared/findBestHand"
import type { MahjongGameData, MahjongPlayer } from "../types"

/**
 * Checks for a game win by the current player and returns any updated parts of state
 * Designed to be spread at the end of a state update to overwrite anything affected by game win
 */
export const handleGameWin = (state: MahjongGameData, newPlayers: MahjongPlayer[]) => {
    const currentPlayer = newPlayers[state.currentPlayer]
    const bestHand = findBestHand(currentPlayer, state.handsData.hands)
    console.log(bestHand)
    if(bestHand.matches === 14) {
        currentPlayer.exposed = putInHandOrder(currentPlayer, bestHand.hand)
        currentPlayer.concealed = []
        return { 
            gameState: GAME_OVER, 
            players: newPlayers 
        }
    }
    return {}
}