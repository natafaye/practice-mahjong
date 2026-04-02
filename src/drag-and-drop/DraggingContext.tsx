import type { ReactNode } from "react"
import { DragDropProvider, DragOverlay, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/react"
import Tile from "../Tile/Tile"
import useMahjongData from "../useMahjongData"
import { getJokerSwapIndex } from "../shared"
import type { MahjongTile } from "../types"
import { THIS_PLAYER } from "../constants"

export const SLOT_ID = "SLOT_"
export const DISCARD_ID = "DISCARD"
export const EXPOSED_RACK_ID = "EXPOSED_RACK"
export const PICK_UP_DISCARD_ID = "PICK_UP_DISCARD"

type Props = {
    children: ReactNode
}

export function DraggingContext({ children }: Props) {
    const { dispatch } = useMahjongData()

    const onDragStart: DragStartEvent = ({ operation: { source } }) => {
        console.log('Started dragging', source?.id);
    }

    const onDragOver: DragOverEvent = ({ operation: { source, target } }) => {
        if (!target || !source) return
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
        }
    }

    const onDragEnd: DragEndEvent = ({ operation: { source, target, canceled } }) => {
        if (!target || !source || canceled) return
        console.log(`Dropped ${source.id} onto ${target.id}`);
        if (target.id === DISCARD_ID) {
            dispatch({
                type: 'DISCARD_TILE', payload: {
                    playerIndex: THIS_PLAYER,
                    tileIndex: source.data.tileIndex
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
            const tile = source.data.tile as MahjongTile

            // Check for a joker swap
            const jokerSwapIndex = getJokerSwapIndex(tile, target.data.player.exposed)
            if (jokerSwapIndex !== -1) {
                dispatch({
                    type: "JOKER_SWAP", payload: {
                        sourcePlayerIndex: THIS_PLAYER,
                        sourceTileIndex: source.data.tileIndex,
                        targetPlayerIndex: target.data.player.index,
                        targetTileIndex: jokerSwapIndex
                    }
                })
            }
            // Add to a meld
            else if (target.data.player.index === THIS_PLAYER) {
                dispatch({
                    type: "ADD_TO_MELD", payload: {
                        tileIndex: source.data.tileIndex
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
                {source => (<Tile tile={source.data.tile as MahjongTile} />)}
            </DragOverlay>
        </DragDropProvider>
    )
}