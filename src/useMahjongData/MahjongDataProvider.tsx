import { useReducer, type ReactNode } from "react";
import { undoableReducer } from "./undoableReducer";
import { generateInitialData } from "./generate/generateInitialData";
import { MahjongDataContext } from "./MahjongDataContext";
import { defaultCard } from "../_data/CARDS";

export const MahjongDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(undoableReducer, {
    past: [],
    present: generateInitialData(4, defaultCard.name),
    future: []
  });
  const canUndo = state.past.length > 0
  const canRedo = state.future.length > 0

  return (
    <MahjongDataContext.Provider value={{ ...state.present, canUndo, canRedo, dispatch }}>
      {children}
    </MahjongDataContext.Provider>
  );
};
