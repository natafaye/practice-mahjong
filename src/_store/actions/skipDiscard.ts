import { DRAWING, GAME_OVER } from "../../constants";
import type { MahjongGameData } from "../../types";

type Payload = {
    playerIndex: number
}

export const skipDiscard = (state: MahjongGameData, { playerIndex }: Payload) => {
    // Can't skip discard if it isn't your turn to call
    if(playerIndex !== state.callingPlayer) return state
    const nextCallingPlayer = (state.callingPlayer + 1) % state.players.length
    // If not everyone's had a chance to call, let the next player call
    if(nextCallingPlayer !== state.currentPlayer)
        return {
            ...state,
            callingPlayer: nextCallingPlayer
        };
    // If every has had a chance to call and we're out of tiles then the game is over
    if(state.wall.length === 0) 
      return { ...state, gameState: GAME_OVER }
    // Else we're done with calling and it's time for the next player to draw
    return {
        ...state,
        gameState: DRAWING,
        callingPlayer: undefined,
        currentPlayer: (state.currentPlayer + 1) % state.players.length
    }
}