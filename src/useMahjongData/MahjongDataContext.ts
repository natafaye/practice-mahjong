import { createContext } from "react";
import type { MahjongGameData } from "../types";
import type { MahjongDispatch } from "./MahjongAction";

type ContextData = MahjongGameData & { 
    dispatch: MahjongDispatch
    canUndo: boolean
    canRedo: boolean
}

export const MahjongDataContext = createContext<ContextData | undefined>(undefined);
