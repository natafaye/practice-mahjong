import { useDragDropMonitor } from "@dnd-kit/react";
import { useState } from "react";
import { DISCARD_ID, PASSING_ID } from "./DraggingContext";
import { JOKER_SUIT } from "../constants";

export function useIsDragging() {
    const [isDragging, setIsDragging] = useState(false)
    const [isDraggingDiscard, setIsDraggingDiscard] = useState(false)
    const [isDraggingPass, setIsDraggingPass] = useState(false)
    const [isDraggingGap, setIsDraggingGap] = useState(false)
    const [isDraggingJoker, setIsDraggingJoker] = useState(false)
    useDragDropMonitor({
        onDragStart: ({ operation }) => {
            const tile = operation.source?.data.tile
            setIsDragging(true)
            setIsDraggingDiscard(operation.source?.data.playerIndex === DISCARD_ID)
            setIsDraggingPass(operation.source?.data.playerIndex === PASSING_ID)
            setIsDraggingGap(typeof tile === "string")
            setIsDraggingJoker(typeof tile !== "string" && tile.suit === JOKER_SUIT)
        },
        onDragEnd: () => {
            setIsDragging(false)
            setIsDraggingDiscard(false)
            setIsDraggingPass(false)
            setIsDraggingGap(false)
        }
    })
    return { isDragging, isDraggingDiscard, isDraggingPass, isDraggingGap, isDraggingJoker }
}