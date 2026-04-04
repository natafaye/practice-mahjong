import { createContext, useReducer, type ReactNode } from "react";
import { mahjongReducer } from "./mahjongReducer";
import { generateInitialData } from "./generateInitialData";
import { HANDS_2025 } from "./2025";
import type { MahjongDispatch } from "./types";
import type { MahjongGameData } from "../types";

export const MahjongDataContext = createContext<MahjongGameData & { dispatch: MahjongDispatch} | undefined>(undefined);

export const MahjongDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, dispatch] = useReducer(mahjongReducer, generateInitialData(4, HANDS_2025));
  return (
    <MahjongDataContext.Provider value={{ ...data, dispatch }}>
      {children}
    </MahjongDataContext.Provider>
  );
};