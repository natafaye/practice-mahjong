import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { MahjongGameData } from "../types";
import { generateInitialData } from "./generate/generateInitialData";
import { drawTileFromWall } from "./actions/drawTileFromWall";
import { makeJokerSwap } from "./actions/makeJokerSwap";
import { callDiscard } from "./actions/callDiscard";
import { addToPassTiles } from "./actions/addToPassTiles";
import { removeFromPassTiles } from "./actions/removeFromPassTiles";
import { markPlayerReadyToPass } from "./actions/markPlayerReadyToPass";
import { skipDiscardTile } from "./actions/skipDiscardTile";
import { discardTile } from "./actions/discardTile";
import { addToPlayerMeld } from "./actions/addToPlayerMeld";
import { cancelPlayerMeld } from "./actions/cancelPlayerMeld";
import { confirmPlayerMeld } from "./actions/confirmPlayerMeld";
import { cancelCharlestonPasses } from "./actions/cancelCharlestonPasses";
import { rearrangeTiles } from "./actions/rearrangeTiles";
import { doAICalls } from "./aiPlayer/doAICalls";
import { doAIPasses } from "./aiPlayer/doAIPasses";
import { defaultCard } from "../_data/CARDS";
import { doAITurn } from "./aiPlayer/doAITurn";
import { PLAYING, THIS_PLAYER } from "../constants";
import { dealHands as dealHandsLogic } from "./generate/dealHands";

const initialState: MahjongGameData = dealHandsLogic(generateInitialData({ numberOfPlayers: 4, cardName: defaultCard.name }));

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    newGame: (_state, action: PayloadAction<{ cardName: string; numberOfPlayers: number; seed?: string; dealer?: number }>) => {
      let nextState = generateInitialData(action.payload);
      nextState = dealHandsLogic(nextState);
      // If it's now an AI's turn, do their turn
      if(nextState.gameState === PLAYING && nextState.currentPlayer !== THIS_PLAYER)
        nextState = doAITurn(nextState, false)
      return nextState
    },
    addToPass: (state, action: PayloadAction<{ playerIndex: number; tileIndexes: number[] }>) => {
      return addToPassTiles(state, action.payload);
    },
    removeFromPass: (state, action: PayloadAction<{ playerIndex: number; passingTileIndex: number }>) => {
      return removeFromPassTiles(state, action.payload);
    },
    markReadyToPass: (state, action: PayloadAction<{ playerIndex: number }>) => {
      let nextState = markPlayerReadyToPass(current(state), action.payload);
      nextState = doAIPasses(nextState);
      // If it's now an AI's turn, do their turn
      if (nextState.gameState === PLAYING && nextState.currentPlayer !== THIS_PLAYER)
        nextState = doAITurn(nextState, false);
      return nextState;
    },
    drawFromWall: (state, action: PayloadAction<{ playerIndex: number }>) => {
      return drawTileFromWall(state, action.payload);
    },
    swapJoker: (
      state,
      action: PayloadAction<{
        sourcePlayerIndex: number;
        sourceTileIndex: number;
        targetPlayerIndex: number;
        targetTileIndex: number;
      }>,
    ) => {
      return makeJokerSwap(state, action.payload);
    },
    discard: (state, action: PayloadAction<{ playerIndex: number; tileIndex: number }>) => {
      let nextState = discardTile(current(state), action.payload);
      nextState = doAICalls(nextState);
      return nextState;
    },
    skipDiscard: (state, action: PayloadAction<{ playerIndex: number }>) => {
      let nextState = skipDiscardTile(current(state), action.payload);
      nextState = doAICalls(nextState);
      return nextState;
    },
    pickUpDiscard: (state, action: PayloadAction<{ playerIndex: number }>) => {
      return callDiscard(state, action.payload);
    },
    addToMeld: (state, action: PayloadAction<{ playerIndex: number; tileIndexes: number[] }>) => {
      return addToPlayerMeld(state, action.payload);
    },
    confirmMeld: (state, action: PayloadAction<{ playerIndex: number }>) => {
      return confirmPlayerMeld(state, action.payload);
    },
    rearrangeConcealed: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      return rearrangeTiles(state, action.payload);
    },
    cancelMeld: (state) => {
      return cancelPlayerMeld(state);
    },
    cancelCharleston: (state) => {
      let nextState = cancelCharlestonPasses(current(state));
      // If it's now an AI's turn, do their turn
      if (nextState.gameState === PLAYING && nextState.currentPlayer !== THIS_PLAYER)
        nextState = doAITurn(nextState, false);
      return nextState;
    },
  },
});

export const {
  newGame,
  addToPass,
  removeFromPass,
  markReadyToPass,
  drawFromWall,
  swapJoker,
  discard,
  skipDiscard,
  pickUpDiscard,
  addToMeld,
  confirmMeld,
  rearrangeConcealed,
  cancelMeld,
  cancelCharleston,
} = gameSlice.actions;

export default gameSlice.reducer;
