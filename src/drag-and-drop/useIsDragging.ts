import { useDragDropMonitor } from "@dnd-kit/react";
import { useState } from "react";
import { DISCARD_ID, GAP_ID } from "./DraggingContext";

export function useIsDragging() {
    const [isDragging, setIsDragging] = useState(false)
    const [isDraggingDiscard, setIsDraggingDiscard] = useState(false)
    const [isDraggingGap, setIsDraggingGap] = useState(false)
    useDragDropMonitor({
        onDragStart: ({ operation }) => {
            setIsDragging(true)
            setIsDraggingDiscard(operation.source?.data.playerIndex === DISCARD_ID)
            setIsDraggingGap(!!operation.source?.id.toString().startsWith(GAP_ID))
        },
        onDragEnd: () => {
            setIsDragging(false)
            setIsDraggingDiscard(false)
            setIsDraggingGap(false)
        }
    })
    return { isDragging, isDraggingDiscard, isDraggingGap }
}