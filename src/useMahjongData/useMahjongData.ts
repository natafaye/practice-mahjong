import { useReducer } from "react"
import { GAP, type MahjongData } from "../types"
import { generateInitialData } from "./generateInitialData";

export function useMahjongData() {
    return useReducer(mahjongReducer, generateInitialData());
}


export type MahjongAction =
    | { type: 'DRAW_FROM_WALL'; payload: { playerIndex: number } }
    | { type: 'DISCARD_TILE'; payload: { playerIndex: number; tileIndex: number } }
    | { type: 'PICK_UP_DISCARD'; payload: { playerIndex: number } }
    | { type: 'EXPOSE_TILES'; payload: { playerIndex: number; tileIndices: number[] } }
    | { type: 'REARRANGE_UNEXPOSED'; payload: { playerIndex: number; startIndex: number; endIndex: number } };


export function mahjongReducer(state: MahjongData, action: MahjongAction) {
    // Helper to deeply clone player hands so we don't mutate state directly
    const cloneHands = () => state.hands.map(hand => ({
        exposed: [...hand.exposed],
        unexposed: [...hand.unexposed]
    }));

    switch (action.type) {
        case 'DRAW_FROM_WALL': {
            if (state.wall.length === 0) {
                console.error("The wall is empty!")
                return state
            }
            const newWall = [...state.wall]
            const drawnTile = newWall.pop()!
            const newHands = cloneHands()
            newHands[action.payload.playerIndex].unexposed.push(drawnTile)
            return { ...state, wall: newWall, hands: newHands }
        }

        case 'DISCARD_TILE': {
            const { playerIndex, tileIndex } = action.payload
            const newHands = cloneHands()
            const unexposed = newHands[playerIndex].unexposed
            const [discardedTile] = unexposed.splice(tileIndex, 1)
            if (typeof discardedTile === "string") {
                console.error("Discarded a gap!")
                return state;
            }
            return {
                ...state,
                hands: newHands,
                discard: [...state.discard, discardedTile]
            };
        }

        case 'PICK_UP_DISCARD': {
            if (state.discard.length === 0) return state;
            
            const newDiscard = [...state.discard];
            const pickedTile = newDiscard.pop()!;
            const newHands = cloneHands();

            newHands[action.payload.playerIndex].unexposed.push(pickedTile);

            return { ...state, discard: newDiscard, hands: newHands };
        }

        case 'EXPOSE_TILES': {
            const { playerIndex, tileIndices } = action.payload;
            const newHands = cloneHands();
            const unexposed = newHands[playerIndex].unexposed;
            const exposed = newHands[playerIndex].exposed;

            // Sort ascending to grab the tiles in the correct order for the meld
            const sortedIndicesAsc = [...tileIndices].sort((a, b) => a - b);
            const tilesToExpose = sortedIndicesAsc.map(i => unexposed[i]);

            // Sort descending to safely splice them out of the array without shifting indices
            const sortedIndicesDesc = [...tileIndices].sort((a, b) => b - a);
            sortedIndicesDesc.forEach(index => {
                unexposed.splice(index, 1);
            });

            // Push the new meld to exposed, followed by a GAP to separate it from future melds
            exposed.push(...tilesToExpose, GAP);

            return { ...state, hands: newHands };
        }

        case 'REARRANGE_UNEXPOSED': {
            const { playerIndex, startIndex, endIndex } = action.payload;
            const newHands = cloneHands();
            const unexposed = newHands[playerIndex].unexposed;

            // Remove the tile from its original position
            const [movedTile] = unexposed.splice(startIndex, 1);
            // Insert it into the new position
            unexposed.splice(endIndex, 0, movedTile);

            return { ...state, hands: newHands };
        }

        default:
            return state;
    }
}