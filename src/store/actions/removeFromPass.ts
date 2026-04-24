import { PASSING_GAPS } from "../../constants";
import type { MahjongGameData } from "../../types";
import { clonePlayers } from "../../store/actions/clonePlayers";

type Payload = {
    playerIndex: number;
    passingTileIndex: number;
};

export const removeFromPass = (state: MahjongGameData, { playerIndex, passingTileIndex }: Payload) => {
    const tileToRemove = state.passing[playerIndex][passingTileIndex];
    // Can't remove if it's not there
    if (!tileToRemove) return state;
    // Remove the tile from passing
    const passing = state.passing.map((tiles, index) =>
        index !== playerIndex ? tiles : tiles.filter((_, i) => i !== passingTileIndex)
    );
    // Put the tile back in the hand, replacing the last added gap
    const players = clonePlayers(state)
    const concealed = players[playerIndex].concealed
    const gapIndex = concealed.indexOf(PASSING_GAPS[state.passing[playerIndex].length - 1])
    concealed[gapIndex] = tileToRemove
    return {
        ...state,
        players,
        passing,
    }
}