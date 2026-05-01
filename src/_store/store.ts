import { configureStore } from '@reduxjs/toolkit';
import undoable, { groupByActionTypes, type StateWithHistory } from 'redux-undo';
import gameReducer, { rearrangeUnexposed } from './gameSlice';
import type { MahjongGameData } from '../types';
import { THIS_PLAYER } from '../constants';
import { recordHandWin } from './localStorage';

const store = configureStore({
  reducer: {
    game: undoable(gameReducer, {
      groupBy: groupByActionTypes([rearrangeUnexposed.type])
    }),
  }
});

// Persist win stats to local storage
store.subscribe(() => {
  const state = store.getState()
  // If we've moved into a winning state for this player, save the stat
  // If for some reason this triggers twice with the same hand & seed, it'll be ignored
  if(state.game.present.winningPlayer === THIS_PLAYER && state.game.present.winningHand) {
    recordHandWin(state.game.present.winningHand, state.game.present.seed)
  }
})

export type RootState = { game: StateWithHistory<MahjongGameData> };
export type AppDispatch = typeof store.dispatch;

export default store;