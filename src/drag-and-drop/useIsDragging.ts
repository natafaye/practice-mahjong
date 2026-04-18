import { useDragDropMonitor } from "@dnd-kit/react";
import { useState } from "react";
import { DISCARD_ID, PASSING_ID } from "./DraggingContext";
import { JOKER_SUIT } from "../constants";
import type { MahjongTile } from "../types";

type DraggingData = { 
    tile?: MahjongTile, 
    tileIndex?: number
    playerIndex: number | typeof DISCARD_ID | typeof PASSING_ID
}

export function useIsDragging() {
    const [draggingData, setDraggingData] = useState<DraggingData | undefined>(undefined)
    useDragDropMonitor({
        onDragStart: ({ operation }) => {
            setDraggingData(operation.source?.data as DraggingData)
        },
        onDragEnd: () => {
            setDraggingData(undefined)
        }
    })
    return { 
        draggingTile: draggingData?.tile, 
        isDragging: draggingData !== undefined, 
        isDraggingDiscard: !!draggingData && draggingData.playerIndex === DISCARD_ID, 
        isDraggingPass: !!draggingData && draggingData.playerIndex === PASSING_ID, 
        isDraggingGap: typeof draggingData?.tile === "string", 
        isDraggingJoker: !!draggingData?.tile && typeof draggingData.tile !== "string" && draggingData.tile.suit === JOKER_SUIT
    }
}