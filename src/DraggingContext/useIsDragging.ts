import { useContext } from "react";
import { DISCARD_ID, DraggingStateContext, PASSING_ID } from "./DraggingContext";
import { JOKER_SUIT } from "../constants";

export function useIsDragging() {
    const { draggingData } = useContext(DraggingStateContext)
    
    return { 
        draggingTile: draggingData?.tile, 
        isDragging: draggingData !== undefined, 
        isDraggingDiscard: !!draggingData && draggingData.playerIndex === DISCARD_ID, 
        isDraggingPass: !!draggingData && draggingData.playerIndex === PASSING_ID, 
        isDraggingGap: !!draggingData?.isGap, 
        isDraggingJoker: !!draggingData?.tile && typeof draggingData.tile !== "string" && draggingData.tile.suit === JOKER_SUIT
    }
}