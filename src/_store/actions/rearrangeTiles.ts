import { EXPOSED_GAP, THIS_PLAYER } from "../../constants";
import type { MahjongGameData } from "../../types";
import { clonePlayers } from "./clonePlayers";

type Payload = {
    startIndex: number;
    endIndex: number;
};

export const rearrangeTiles = (state: MahjongGameData, { startIndex, endIndex }: Payload) => {
    // If it didn't move or it's a discard or passing tile, we're done
    if (startIndex === endIndex || startIndex === undefined) return state;
    const newPlayers = clonePlayers(state);
    const concealed = newPlayers[THIS_PLAYER].concealed;
    const itemToMove = concealed[startIndex];
    // Put a placeholder gap in the starting spot
    concealed[startIndex] = EXPOSED_GAP;
    // Shift tiles to remove the original gap, to preserve spacing
    if (startIndex > endIndex) {
        // Dragged left: Shift everything in between to the right
        for (let i = startIndex; i > endIndex; i--) {
            concealed[i] = concealed[i - 1];
        }
    } else {
        // Dragged right: Shift everything in between to the left
        for (let i = startIndex; i < endIndex; i++) {
            concealed[i] = concealed[i + 1];
        }
    }
    // Insert the dragged tile into the now-cleared target slot
    concealed[endIndex] = itemToMove;
    return { ...state, players: newPlayers };
}