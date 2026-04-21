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
      const newPast = [...past];
      const newPresent = newPast.pop()!;
      const newFuture = [...future, present];
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
      const newFuture = [...future];
      const newPresent = newFuture.pop()!;
      const newPast = [...past, present];
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
