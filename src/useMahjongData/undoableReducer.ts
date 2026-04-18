import { THIS_PLAYER } from "../constants";
import type { MahjongGameData } from "../types";
import { mahjongReducer } from "./mahjongReducer";
import type { MahjongAction } from "./MahjongAction";

export interface UndoableState {
  past: MahjongGameData[];
  present: MahjongGameData;
  future: MahjongGameData[];
  lastActionType?: string;
}

export function undoableReducer(state: UndoableState, action: MahjongAction): UndoableState {
  const { past, present, future, lastActionType } = state;

  switch (action.type) {
    case "UNDO": {
      // Can't undo if we're at the beginning of this game
      if (past.length === 0) return state;
      // Do the undo
      let newPast = [...past];
      let newPresent = newPast.pop()!;
      let newFuture = [...future, present];
      // Keep undoing until we get to a human player's decision
      while (newPast.length > 0 && newPresent.currentPlayer !== THIS_PLAYER) {
        newFuture.push(newPresent)
        newPresent = newPast.pop()!;
      }
      return {
        past: newPast,
        present: newPresent,
        future: newFuture,
        lastActionType: "UNDO"
      };
    }

    case "REDO": {
      // Can't redo if we're up to date
      if (future.length === 0) return state;
      // Do the redo
      let newFuture = [...future];
      let newPresent = newFuture.shift()!;
      let newPast = [...past, present];
      // Keep redoing until we get to a human player's decision
      while (newFuture.length > 0 && newPresent.currentPlayer !== THIS_PLAYER) {
        newPast.push(newPresent);
        newPresent = newFuture.pop()!;
      }
      return {
        past: newPast,
        present: newPresent,
        future: newFuture,
        lastActionType: "REDO"
      };
    }

    case "RESTART": {
        const nextPresent = mahjongReducer(present, action);
        return {
            past: [],
            present: nextPresent,
            future: [],
            lastActionType: action.type
        }
    }

    default: {
      const nextPresent = mahjongReducer(present, action);
      // If we didn't do anything, no need to filter history
      if (present === nextPresent) {
        return state;
      }
      // If we are rearranging tiles, don't save every tiny movement to 'past'.
      // Only save if the previous action was NOT a rearrangement.
      // This means the "Undo" will take you back to before you started dragging.
      const isTransient = action.type === "REARRANGE_UNEXPOSED" && lastActionType === "REARRANGE_UNEXPOSED";
      return {
        past: isTransient ? past : [...past, present],
        present: nextPresent,
        future: [], // New action clears the redo history
        lastActionType: action.type
      };
    }
  }
}
