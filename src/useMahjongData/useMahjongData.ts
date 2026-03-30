import { useReducer } from "react"
import { DISCARD, DISCARD_AI, DRAWING, GAME_OVER, GAP, PLAYING, type MahjongData } from "../types"
import { generateInitialData, THIS_PLAYER } from "./generateInitialData";
import { JOKER_SUIT } from "./generateTiles";

export function useMahjongData() {
    return useReducer(mahjongReducer, generateInitialData());
}

export type MahjongAction =
    | { type: 'DRAW_FROM_WALL'; payload: { playerIndex: number } }
    | { type: 'JOKER_SWAP'; payload: { 
        sourcePlayerIndex: number, 
        sourceTileIndex: number, 
        targetPlayerIndex: number, 
        targetTileIndex: number 
    } }
    | { type: 'ADD_TO_MELD'; payload: { tileIndex: number } }
    | { type: 'CANCEL_MELD' }
    | { type: 'CONFIRM_MELD' }
    | { type: 'DISCARD_TILE'; payload: { playerIndex: number; tileIndex: number } }
    | { type: 'PICK_UP_DISCARD'; payload: { playerIndex: number } }
    | { type: 'SKIP_DISCARD' }
    | { type: 'SKIP_DISCARD_AI' }

    | { type: 'EXPOSE_TILES'; payload: { playerIndex: number; tileIndices: number[] } }
    | { type: 'REARRANGE_UNEXPOSED'; payload: { 
        playerIndex: number; 
        startIndex: number; 
        endIndex: number 
    } }

export function mahjongReducer(state: MahjongData, action: MahjongAction): MahjongData {
    console.log(state, action)
    // Helper to deeply clone player hands so we don't mutate state directly
    const clonePlayers = () => state.players.map(player => ({
        ...player,
        exposed: [...player.exposed],
        unexposed: [...player.unexposed]
    }));

    switch (action.type) {

        // Draw a tile from the wall
        case 'DRAW_FROM_WALL': {
            // Can't draw if it's not your turn
            if(action.payload.playerIndex !== state.currentPlayer) return state
            // Can't draw if it's not the right time
            if(state.gameState !== DRAWING) return state
            // If the wall is empty, the game is over
            if (state.wall.length === 0) {
                return { 
                    ...state,
                    gameState: GAME_OVER
                }
            }
            // Draw a tile from the wall and add it to the player's tiles
            const drawnTile = state.wall.at(-1)!
            const newPlayers = clonePlayers()
            newPlayers[action.payload.playerIndex].unexposed.unshift(drawnTile)
            return { 
                ...state, 
                wall: state.wall.slice(0, -1), 
                players: newPlayers,
                gameState: PLAYING
            }
        }

        // Discard a tile from the current player's hand, ending their turn
        case 'DISCARD_TILE': {
            const { playerIndex, tileIndex } = action.payload
            // You can only discard on your own turn, during the PLAYING state
            if(playerIndex !== state.currentPlayer || state.gameState !== PLAYING) return state
            // Get the discarded tile
            const player = state.players[playerIndex]
            const discardedTile = player.unexposed[tileIndex]
            // You can't discard a Gap
            if(typeof discardedTile === "string") return state
            // Remove the tile from the player's tiles, add it to the discard, and move to next turn
            const newPlayers = clonePlayers()
            newPlayers[playerIndex].unexposed.splice(tileIndex, 1)
            return {
                ...state,
                players: newPlayers,
                discard: [...state.discard, discardedTile],
                gameState: state.currentPlayer === THIS_PLAYER ? DISCARD_AI : DISCARD
            }
        }

        // Attempt to swap a tile for a joker in another player's exposed tiles
        case 'JOKER_SWAP': {
            const { sourcePlayerIndex, sourceTileIndex, targetPlayerIndex, targetTileIndex } = action.payload
            // You can only swap on your own turn
            if(sourcePlayerIndex !== state.currentPlayer) return state
            // Get the swapping tiles
            const swapTile = state.players[sourcePlayerIndex].unexposed[sourceTileIndex]
            const joker = state.players[targetPlayerIndex].exposed[targetTileIndex]
            // You can't swap a Gap
            if(typeof swapTile === "string" || typeof joker === "string") return state
            // If it's not a joker, we can't make the swap
            if(joker.suit !== JOKER_SUIT) return state
            // Swap the joker and the swapping tile
            const newPlayers = clonePlayers()
            newPlayers[sourcePlayerIndex].unexposed.splice(sourceTileIndex, 1, joker)
            newPlayers[targetPlayerIndex].exposed.splice(targetTileIndex, 1, swapTile)
            return {
                ...state,
                players: newPlayers
            }
        }

        case 'SKIP_DISCARD': {
            return {
                ...state,
                gameState: DISCARD_AI
            }
        }

        case 'SKIP_DISCARD_AI': {
            return {
                ...state,
                currentPlayer: (state.currentPlayer + 1) % state.players.length,
                gameState: DRAWING
            }
        }

        // Pick up the latest tile in the discard
        case 'PICK_UP_DISCARD': {
            const playerIndex = action.payload.playerIndex
            // Can't pick up from discard if it's empty
            if (state.discard.length === 0) return state
            // Can't pick up from discard if it's not your turn
            if (playerIndex !== state.currentPlayer) return state
            // Can't pick up from discard if you've already picked up
            const player = state.players[playerIndex]
            if (player.unexposed.length + player.exposed.length === 14) return state
            // Take the latest tile from the discard and add it to the player's hand
            const newDiscard = [...state.discard]
            const pickedTile = newDiscard.pop()!
            const newPlayers = clonePlayers()
            newPlayers[playerIndex].unexposed.push(pickedTile)
            return { 
                ...state, 
                discard: newDiscard, 
                players: newPlayers,
                currentPlayer: playerIndex,
                gameState: PLAYING
            }
        }

        case 'ADD_TO_MELD': {
            // Can't meld on a turn that isn't yours 
            // (Other players don't add to meld, they reveal the meld all at once)
            if (state.currentPlayer !== THIS_PLAYER || state.gameState !== PLAYING) return state
            // Remove the tile from this player's tiles and add to the melding tiles
            const newPlayers = clonePlayers();
            const [meldingTile] = newPlayers[THIS_PLAYER].unexposed.splice(action.payload.tileIndex, 1)
            // You can't meld a gap
            if(typeof meldingTile === "string") return state
            return {
                ...state,
                players: newPlayers,
                melding: [...state.melding, meldingTile]
            }
        }

        // Add tiles to a potential meld
        case 'CANCEL_MELD': {
            // Remove the tiles from the melding list and add them back to the player's tiles
            const newPlayers = clonePlayers();
            newPlayers[THIS_PLAYER].unexposed.push(...state.melding)
            return {
                ...state,
                players: newPlayers,
                melding: []
            }
        }

        // Add tiles to a potential meld
        case 'CONFIRM_MELD': {
            // Remove the tiles from the melding list and add them back to the player's exposed tiles
            const newPlayers = clonePlayers();
            newPlayers[THIS_PLAYER].exposed.push(...state.melding, GAP)
            return {
                ...state,
                players: newPlayers,
                melding: []
            }
        }

        case 'EXPOSE_TILES': {
            const { playerIndex, tileIndices } = action.payload;
            const newPlayers = clonePlayers();
            const unexposed = newPlayers[playerIndex].unexposed;
            const exposed = newPlayers[playerIndex].exposed;

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

            return { ...state, players: newPlayers };
        }

        case 'REARRANGE_UNEXPOSED': {
            const { playerIndex, startIndex, endIndex } = action.payload;
            const newPlayers = clonePlayers();
            const unexposed = newPlayers[playerIndex].unexposed;

            // Remove the tile from its original position
            const [movedTile] = unexposed.splice(startIndex, 1);
            // Insert it into the new position
            unexposed.splice(endIndex, 0, movedTile);

            return { ...state, players: newPlayers };
        }

        default:
            return state;
    }
}