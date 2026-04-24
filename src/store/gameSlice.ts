import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MahjongGameData } from '../types';
import { generateInitialData } from './generate/generateInitialData';
import { discardTile as discardTileLogic } from './actions/discardTile';
import { drawFromWall as drawFromWallLogic } from './actions/drawFromWall';
import { swapJoker as swapJokerLogic } from './actions/swapJoker';
import { pickUpDiscard as pickUpDiscardLogic } from './actions/pickUpDiscard';
import { addToPass as addToPassLogic } from './actions/addToPass';
import { removeFromPass as removeFromPassLogic } from './actions/removeFromPass';
import { markReadyToPass as markReadyToPassLogic } from './actions/markReadyToPass';
import { skipDiscard as skipDiscardLogic } from './actions/skipDiscard';
import { addToMeld as addToMeldLogic } from './actions/addToMeld';
import { cancelMeld as cancelMeldLogic } from './actions/cancelMeld';
import { cancelCharleston as cancelCharlestonLogic } from './actions/cancelCharleston';
import { confirmMeld as confirmMeldLogic } from './actions/confirmMeld';
import { rearrangeUnexposed as rearrangeUnexposedLogic } from './actions/rearrangeUnexposed';
import { doAICalls } from './aiPlayer/doAICalls';
import { doAIPasses } from './aiPlayer/doAIPasses';

import { defaultCard } from '../_data/CARDS';

const initialState: MahjongGameData = generateInitialData(4, defaultCard.name);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    restart: (_state, action: PayloadAction<{ cardName: string, numberOfPlayers: number }>) => {
      return generateInitialData(action.payload.numberOfPlayers, action.payload.cardName);
    },
    addToPass: (state, action: PayloadAction<{ playerIndex: number, tileIndexes: number[] }>) => {
      return addToPassLogic(state, action.payload);
    },
    removeFromPass: (state, action: PayloadAction<{ playerIndex: number, passingTileIndex: number }>) => {
      return removeFromPassLogic(state, action.payload);
    },
    markReadyToPass: (state, action: PayloadAction<{ playerIndex: number }>) => {
      let nextState = markReadyToPassLogic(state, action.payload);
      nextState = doAIPasses(nextState);
      return nextState;
    },
    drawFromWall: (state, action: PayloadAction<{ playerIndex: number }>) => {
      return drawFromWallLogic(state, action.payload);
    },
    swapJoker: (state, action: PayloadAction<{
      sourcePlayerIndex: number,
      sourceTileIndex: number,
      targetPlayerIndex: number,
      targetTileIndex: number
    }>) => {
      return swapJokerLogic(state, action.payload);
    },
    discardTile: (state, action: PayloadAction<{ playerIndex: number; tileIndex: number }>) => {
      let nextState = discardTileLogic(state, action.payload);
      nextState = doAICalls(nextState);
      return nextState;
    },
    skipDiscard: (state, action: PayloadAction<{ playerIndex: number }>) => {
      let nextState = skipDiscardLogic(state, action.payload);
      nextState = doAICalls(nextState);
      return nextState;
    },
    pickUpDiscard: (state, action: PayloadAction<{ playerIndex: number }>) => {
      return pickUpDiscardLogic(state, action.payload);
    },
    addToMeld: (state, action: PayloadAction<{ playerIndex: number, tileIndexes: number[] }>) => {
      return addToMeldLogic(state, action.payload);
    },
    confirmMeld: (state, action: PayloadAction<{ playerIndex: number }>) => {
      return confirmMeldLogic(state, action.payload);
    },
    rearrangeUnexposed: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      return rearrangeUnexposedLogic(state, action.payload);
    },
    cancelMeld: (state) => {
      return cancelMeldLogic(state);
    },
    cancelCharleston: (state) => {
      return cancelCharlestonLogic(state);
    },
  },
});

export const {
  restart,
  addToPass,
  removeFromPass,
  markReadyToPass,
  drawFromWall,
  swapJoker,
  discardTile,
  skipDiscard,
  pickUpDiscard,
  addToMeld,
  confirmMeld,
  rearrangeUnexposed,
  cancelMeld,
  cancelCharleston,
} = gameSlice.actions;

export default gameSlice.reducer;
