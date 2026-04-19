import { PASSING_GAPS } from "../../constants";
import type { MahjongGameData } from "../../types";
import { clonePlayers } from "./clonePlayers";

type Payload = {
    playerIndex: number
    tileIndexes: number[]
}

export const addToPass = (state: MahjongGameData, { playerIndex, tileIndexes }: Payload) => {
    const tilesToAdd = tileIndexes.map(index => state.players[playerIndex].concealed[index])
    if(
        // You can't add to passing tiles if there's already 3
        state.passing[playerIndex].length === 3
        // You can't add a gap to passing tiles
        || !tilesToAdd.every(tile => typeof tile !== "string")
    ) return state
    // Add the tiles to passing
    const passing = state.passing.map((tiles, index) =>
        index !== playerIndex ? tiles : [...tiles, ...tilesToAdd],
    );
    // Remove the tiles from the player's tiles and replace with gaps
    const players = clonePlayers(state)
    let nextGapIndex = state.passing[playerIndex].length
    tileIndexes.toSorted((a, b) => b - a).forEach(tileIndex => {
        players[playerIndex].concealed.splice(tileIndex, 1)
        players[playerIndex].concealed.unshift(PASSING_GAPS[nextGapIndex++])
    })
    return {
        ...state,
        players,
        passing,
    }
}