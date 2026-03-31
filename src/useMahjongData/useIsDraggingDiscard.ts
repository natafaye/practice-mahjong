import { useDragDropMonitor } from "@dnd-kit/react";
import { useState } from "react";

export default function useIsDraggingDiscard() {
    const [isDraggingDiscard, setIsDraggingDiscard] = useState(false)
    useDragDropMonitor({
        onDragStart: ({ operation }) => setIsDraggingDiscard(operation.source?.data.playerIndex === "DISCARD"),
        onDragEnd: () => setIsDraggingDiscard(false)
    })
    return isDraggingDiscard
}