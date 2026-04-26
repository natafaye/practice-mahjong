import { useDraggable } from "@dnd-kit/react"
import { THIS_PLAYER } from "../constants"
import Gap from "./Gap"
import { GAP_ID } from "../DraggingContext/DraggingContext"
import type { MahjongGap, Size } from "../types"

type Props = {
    index: number
    size: Size
    gap: MahjongGap
}

export default function DraggableGap({ index, size, gap }: Props) {
    const { ref, isDragging } = useDraggable({
        id: GAP_ID + gap,
        data: { 
            tileIndex: index,
            playerIndex: THIS_PLAYER,
            isGap: true
        }
    })

    return (
        <div ref={ref} className="w-full h-full flex items-center justify-center" style={{
            opacity: isDragging ? 0 : 0.5
        }}>
            <Gap size={size}/>
        </div>
    )
}