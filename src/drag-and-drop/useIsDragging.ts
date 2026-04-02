import { useDragDropMonitor } from "@dnd-kit/react";
import { useState } from "react";
import { DISCARD_ID } from "./DraggingContext";

export function useIsDragging() {
    const [isDragging, setIsDragging] = useState(false)
    const [isDraggingDiscard, setIsDraggingDiscard] = useState(false)
    useDragDropMonitor({
        onDragStart: ({ operation }) => {
            setIsDragging(true)
            setIsDraggingDiscard(operation.source?.data.playerIndex === DISCARD_ID)
        },
        onDragEnd: () => {
            setIsDragging(false)
            setIsDraggingDiscard(false)
        }
    })
    return { isDragging, isDraggingDiscard }
}