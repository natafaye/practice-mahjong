import { putInMeldOrder, checkIfMeldValid } from "../shared";
import {
  DISCARD,
  DISCARD_AI,
  DRAWING,
  GAME_OVER,
  EXPOSED_GAP,
  MELDING,
  PLAYING,
  JOKER_SUIT,
  THIS_PLAYER,
  GAPS,
  CHARLESTONS,
  PASSING_GAPS,
  NORMAL_PASS
} from "../constants";
import type { MahjongGameData } from "../types";
import type { MahjongAction } from "./types";
import { CARDS } from "./CARDS";
import { generateInitialData } from "./generateInitialData";
import { doCharlestonPass } from "./doCharlestonPass/doCharlestonPass";
import { clonePlayers } from "./clonePlayers";

export function mahjongReducer(
  state: MahjongGameData,
  action: MahjongAction,
): MahjongGameData {
  console.log(state, action);

  switch (action.type) {
    // Start a new fresh game
    case "RESTART": {
      const card = CARDS.find((card) => card.name === action.payload.cardName)!;
      return generateInitialData(action.payload.numberOfPlayers, card);
    }

    case "ADD_TO_PASS": {
      const { playerIndex, tileIndexes } = action.payload;
      const tilesToAdd = tileIndexes.map(index => state.players[playerIndex].concealed[index])
      // You can't add to passing tiles if there's already 3
      if(state.passing[playerIndex].length === 3) return state
      // You can't add a gap to passing tiles
      if(!tilesToAdd.every(tile => typeof tile !== "string")) return state
      // Add the tiles to passing
      const passing = state.passing.map((tiles, index) =>
        index !== playerIndex ? tiles : [...tiles, ...tilesToAdd],
      );
      // Remove the tiles from the player's tiles and replace with gaps
      const players = clonePlayers(state)
      let nextGapIndex = state.passing[playerIndex].length
      tileIndexes.toSorted((a, b) => b - a).forEach(tileIndex => {
        players[playerIndex].concealed.splice(tileIndex, 1)
        players[playerIndex].concealed.push(PASSING_GAPS[nextGapIndex++])
      })
      return {
        ...state,
        players,
        passing,
      }
    }

    case "REMOVE_FROM_PASS": {
      const { playerIndex, passingTileIndex } = action.payload;
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

    case "MARK_READY_TO_PASS": {
      // Can't pass the charleston if we're not doing that right now
      if (!CHARLESTONS.includes(state.gameState)) 
        return state;
      const { playerIndex } = action.payload
      const [, type] = state.gameState.split("_")
      // Can't mark yourself as ready to pass if you don't have enough tiles picked
      if(type === NORMAL_PASS && state.passing[playerIndex].length < 3)
        return state;
      const readyToPass = state.readyToPass.map((ready, index) => index === playerIndex ? true : ready)
      // If not everyone is ready, just update the readyToPass array
      if(!readyToPass.every(ready => ready)) 
        return { ...state, readyToPass }
      // Else make the pass
      const { newPlayers, newWall } = doCharlestonPass(state)
      return {
        ...state,
        players: newPlayers,
        wall: newWall,
        passing: state.players.map(() => []),
        readyToPass: state.players.map(() => false),
        gameState: CHARLESTONS[CHARLESTONS.indexOf(state.gameState) + 1] || DRAWING,
      }
    }

    // Draw a tile from the wall
    case "DRAW_FROM_WALL": {
      const { playerIndex } = action.payload;
      // Can't draw if it's not your turn
      if (state.currentPlayer !== playerIndex) return state;
      // Can't draw if it's not the right time
      if (state.gameState !== DRAWING) return state;
      // If the wall is empty, the game is over
      if (state.wall.length === 0) {
        return {
          ...state,
          gameState: GAME_OVER,
        };
      }
      // Draw a tile from the wall and add it to the player's tiles
      const drawnTile = state.wall.at(-1)!;
      const newPlayers = clonePlayers(state);
      if (playerIndex === THIS_PLAYER) {
        const replacementIndex = newPlayers[playerIndex].concealed.findIndex(
          (tile) => typeof tile === "string",
        );
        newPlayers[playerIndex].concealed[replacementIndex] = drawnTile;
      } else {
        newPlayers[playerIndex].concealed.unshift(drawnTile);
      }
      return {
        ...state,
        wall: state.wall.slice(0, -1),
        players: newPlayers,
        gameState: PLAYING,
      };
    }

    // Discard a tile from the current player's hand, ending their turn
    case "DISCARD_TILE": {
      const { playerIndex, tileIndex } = action.payload;
      // You can only discard on your own turn, during the PLAYING state
      if (playerIndex !== state.currentPlayer || state.gameState !== PLAYING)
        return state;
      // Get the discarded tile
      const player = state.players[playerIndex];
      const discardedTile = player.concealed[tileIndex];
      // You can't discard a Gap
      if (typeof discardedTile === "string") return state;
      // Remove the tile from the player's tiles
      const newPlayers = clonePlayers(state);
      const concealed = newPlayers[playerIndex].concealed;
      concealed.splice(tileIndex, 1);
      // If there's a gap missing (taken over by the drawn tile) then put it back in
      const missingGap = GAPS.find((gap) => !concealed.includes(gap));
      if (missingGap) concealed.unshift(missingGap);
      // Add the removed tile to the discard and go to the next turn
      return {
        ...state,
        players: newPlayers,
        discard: [...state.discard, discardedTile],
        gameState: state.currentPlayer === THIS_PLAYER ? DISCARD_AI : DISCARD,
      };
    }

    // Attempt to swap a tile for a joker in another player's exposed tiles
    case "JOKER_SWAP": {
      const {
        sourcePlayerIndex,
        sourceTileIndex,
        targetPlayerIndex,
        targetTileIndex,
      } = action.payload;
      // You can only swap on your own turn
      if (sourcePlayerIndex !== state.currentPlayer) return state;
      // Get the swapping tiles
      const swapTile = state.players[sourcePlayerIndex].concealed[sourceTileIndex];
      const joker = state.players[targetPlayerIndex].exposed[targetTileIndex];
      // You can't swap a Gap
      if (typeof swapTile === "string" || typeof joker === "string") return state;
      // If it's not a joker, we can't make the swap
      if (joker.suit !== JOKER_SUIT) return state;
      // Swap the joker and the swapping tile
      const newPlayers = clonePlayers(state);
      newPlayers[sourcePlayerIndex].concealed.splice(sourceTileIndex, 1, joker);
      newPlayers[targetPlayerIndex].exposed.splice(targetTileIndex, 1, swapTile);
      return {
        ...state,
        players: newPlayers,
      };
    }

    case "SKIP_DISCARD": {
      return {
        ...state,
        gameState: DISCARD_AI,
      };
    }

    case "SKIP_DISCARD_AI": {
      return {
        ...state,
        currentPlayer: (state.currentPlayer + 1) % state.players.length,
        gameState: DRAWING,
      };
    }

    // Pick up the latest tile in the discard
    case "PICK_UP_DISCARD": {
      // Can't pick up from discard if it's empty
      if (state.discard.length === 0) return state;
      // Can't pick up from discard if it's a joker
      if (state.discard.at(-1)!.suit === JOKER_SUIT) return state;
      // Can't pick up from discard if it's not discard pick up time
      if (state.gameState !== "DISCARD" && state.gameState !== "DISCARD_AI")
        return state;
      // If that's the last tile needed for mahjong, end the game
      // if(false) {
      // 	const newPlayers = clonePlayers()
      // 	const player = newPlayers[action.payload.playerIndex]
      // 	player.exposed = player.exposed.concat(player.concealed) // putInHandOrder(player.exposed.concat(player.concealed))
      // 	player.concealed = []
      // 	return {
      // 		...state,
      // 		discard: state.discard.slice(0, -1),
      // 		players: newPlayers,
      // 		currentPlayer: playerIndex,
      // 		gameState: GAME_OVER
      // 	}
      // }

      // Take the latest tile from the discard and add it to the melding tiles
      const pickedTile = state.discard.at(-1)!;
      return {
        ...state,
        discard: state.discard.slice(0, -1),
        melding: [pickedTile],
        gameState: MELDING,
      };
    }

    case "ADD_TO_MELD": {
      // Can't add to meld if we're not currently melding
      if (state.gameState !== MELDING) return state;
      // Remove the tile from this player's tiles and add to the melding tiles
      const newPlayers = clonePlayers(state);
      const [meldingTile] = newPlayers[THIS_PLAYER].concealed.splice(
        action.payload.tileIndex,
        1,
      );
      // You can't meld a gap
      if (typeof meldingTile === "string") return state;
      return {
        ...state,
        players: newPlayers,
        melding: [...state.melding, meldingTile],
      };
    }

    // Add tiles to a potential meld
    case "CANCEL_MELD": {
      // Remove the tiles from the melding list and add them back to the player's tiles
      const newPlayers = clonePlayers(state);
      newPlayers[THIS_PLAYER].concealed.push(...state.melding.slice(1));
      return {
        ...state,
        discard: [...state.discard, state.melding[0]],
        players: newPlayers,
        melding: [],
        gameState: DISCARD,
      };
    }

    // Add tiles to a potential meld
    case "CONFIRM_MELD": {
      // Can't meld it if it isn't a valid callable meld
      if (!checkIfMeldValid(state.melding, state.handsData.callableMelds))
        return state;
      // Remove the tiles from the melding list and add them back to the player's exposed tiles
      const newPlayers = clonePlayers(state);
      // Put the melded tiles in an order that matches a valid meld
      const sortedMeld = putInMeldOrder(state.melding, state.handsData.melds);
      newPlayers[THIS_PLAYER].exposed.push(...sortedMeld, EXPOSED_GAP);
      return {
        ...state,
        players: newPlayers,
        melding: [],
        gameState: PLAYING,
        currentPlayer: THIS_PLAYER,
      };
    }

    case "REARRANGE_UNEXPOSED": {
      const { startIndex, endIndex } = action.payload;
      // If it didn't move, we're done
      if (startIndex === endIndex) return state;
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

    case "EXPOSE_TILES": {
      const { playerIndex, tileIndices } = action.payload;
      const newPlayers = clonePlayers(state);
      const concealed = newPlayers[playerIndex].concealed;
      const exposed = newPlayers[playerIndex].exposed;

      // Sort ascending to grab the tiles in the correct order for the meld
      const sortedIndicesAsc = [...tileIndices].sort((a, b) => a - b);
      const tilesToExpose = sortedIndicesAsc.map((i) => concealed[i]);

      // Sort descending to safely splice them out of the array without shifting indices
      const sortedIndicesDesc = [...tileIndices].sort((a, b) => b - a);
      sortedIndicesDesc.forEach((index) => {
        concealed.splice(index, 1);
      });

      // Push the new meld to exposed, followed by an EXPOSED_GAP to separate it from future melds
      exposed.push(...tilesToExpose, EXPOSED_GAP);

      return { ...state, players: newPlayers };
    }

    default:
      return state;
  }
}
