import { useDraggable } from "@dnd-kit/react"
import { THIS_PLAYER } from "../constants"
import Gap from "./Gap"
import { GAP_ID } from "../drag-and-drop/DraggingContext"
import type { MahjongGap } from "../types"

type Props = {
    index: number
    gap: MahjongGap
}

export default function DraggableGap({ index, gap }: Props) {
    const { ref, isDragging } = useDraggable({
        id: GAP_ID + gap,
        data: { 
            tileIndex: index,
            playerIndex: THIS_PLAYER
        }
    })

    return (
        <div ref={ref} className="w-full h-full flex items-center justify-center" style={{
            opacity: isDragging ? 1 : 0.5
        }}>
            <Gap/>
        </div>
    )
}