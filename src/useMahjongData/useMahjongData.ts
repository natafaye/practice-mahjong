import { useContext } from "react";
import { MahjongDataContext } from "./MahjongDataProvider";

export const useMahjongData = () => {
  const context = useContext(MahjongDataContext);
  if (!context) {
    throw new Error('useMahjongData must be used within a MahjongDataProvider');
  }
  return context;
}