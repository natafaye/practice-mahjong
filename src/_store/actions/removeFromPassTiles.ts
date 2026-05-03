import { PASSING_GAPS } from "../../constants";
import type { MahjongGameData } from "../../types";
import { clonePlayers } from "./clonePlayers";

type Payload = {
    playerIndex: number;
    passingTileIndex: number;
};

export const removeFromPassTiles = (state: MahjongGameData, { playerIndex, passingTileIndex }: Payload) => {
    const tileToRemove = state.passing[playerIndex][passingTileIndex];
    // Can't remove if it's not there
    if (!tileToRemove) return state;
    // Remove the tile from passing
    const passing = state.passing.map((tiles, index) =>
        index !== playerIndex ? tiles : tiles.filter((_, i) => i !== passingTileIndex)
    );
    // Map the passingTileIndex to the gaps currently in the hand
    const players = clonePlayers(state)
    const concealed = players[playerIndex].concealed
    const existingGaps = concealed.filter(t => typeof t === "string" && PASSING_GAPS.includes(t)).toSorted()
    const gapToReplace = existingGaps[passingTileIndex]
    const gapIndex = concealed.indexOf(gapToReplace)
    concealed[gapIndex] = tileToRemove
    return {
        ...state,
        players,
        passing,
    }
}