import { useRef, type ReactNode } from "react"
import { DragDropProvider, DragOverlay, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/react"
import Tile from "../Tile/Tile"
import useMahjongData from "../useMahjongData"
import { getJokerSwapIndex } from "../shared"
import type { MahjongTile } from "../types"
import { THIS_PLAYER } from "../constants"

export const GAP_ID = "GAP_"
export const SLOT_ID = "SLOT_"
export const DISCARD_ID = "DISCARD"
export const EXPOSED_RACK_ID = "EXPOSED_RACK"
export const PICK_UP_DISCARD_ID = "PICK_UP_DISCARD"

type Props = {
    children: ReactNode
}

export function DraggingContext({ children }: Props) {
    const { dispatch } = useMahjongData()
    const currentDragIndex = useRef<number | null>(null)

    const onDragStart: DragStartEvent = ({ operation: { source } }) => {
        console.log('Started dragging', source?.id);
        if(source) {
            currentDragIndex.current = source.data.tileIndex;
        }
    }

    const onDragOver: DragOverEvent = ({ operation: { source, target } }) => {
        if (!target || !source || currentDragIndex.current === null) return
        console.log(`Dragged ${source?.id} over ${target?.id}`);
        const targetId = String(target.id);
        if (targetId.startsWith(SLOT_ID)) {
            const [, targetSlotIndexStr] = targetId.split('_')
            const targetSlotIndex = parseInt(targetSlotIndexStr)
            dispatch({
                type: 'REARRANGE_UNEXPOSED',
                payload: {
                    startIndex: source.data.tileIndex,
                    endIndex: targetSlotIndex
                }
            })
            currentDragIndex.current = targetSlotIndex
        }
    }

    const onDragEnd: DragEndEvent = ({ operation: { source, target, canceled } }) => {
        if (!target || !source || canceled || currentDragIndex.current === null) return
        const finalIndex = currentDragIndex.current;
        currentDragIndex.current = null;
        console.log(`Dropped ${source.id} onto ${target.id}`);
        if (target.id === DISCARD_ID && !source.id.toString().startsWith(GAP_ID)) {
            dispatch({
                type: 'DISCARD_TILE', payload: {
                    playerIndex: THIS_PLAYER,
                    tileIndex: finalIndex
                }
            })
        }
        else if (target.id === PICK_UP_DISCARD_ID) {
            dispatch({
                type: 'PICK_UP_DISCARD',
                payload: {
                    playerIndex: THIS_PLAYER
                }
            })
        }
        else if (target.id === EXPOSED_RACK_ID) {
            // Check for a joker swap
            const jokerSwapIndex = getJokerSwapIndex(source.data.tile, target.data.player.exposed)
            if (jokerSwapIndex !== -1) {
                dispatch({
                    type: "JOKER_SWAP", payload: {
                        sourcePlayerIndex: THIS_PLAYER,
                        sourceTileIndex: finalIndex,
                        targetPlayerIndex: target.data.player.index,
                        targetTileIndex: jokerSwapIndex
                    }
                })
            }
            // Add to a meld
            else if (target.data.player.index === THIS_PLAYER) {
                dispatch({
                    type: "ADD_TO_MELD", payload: {
                        tileIndex: finalIndex
                    }
                })
            }
        }
    }

    return (
        <DragDropProvider
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            {children}
            <DragOverlay>
                {source => source.data.tile && (
                    <Tile tile={source.data.tile as MahjongTile} />
                )
            }
            </DragOverlay>
        </DragDropProvider>
    )
}