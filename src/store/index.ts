import { configureStore } from '@reduxjs/toolkit';
import undoable, { groupByActionTypes } from 'redux-undo';
import gameReducer, { rearrangeUnexposed } from './gameSlice';

const store = configureStore({
  reducer: {
    game: undoable(gameReducer, {
      groupBy: groupByActionTypes(rearrangeUnexposed.type),
    }),
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
