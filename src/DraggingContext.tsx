import { type ActionDispatch, type ReactNode } from "react"
import { DragDropProvider, DragOverlay, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/react"
import type { MahjongAction } from "./useMahjongData/useMahjongData"
import { getJokerSwapIndex } from "./useMahjongData/getJokerSwapIndex"
import type { MahjongTile } from "./types"
import { THIS_PLAYER } from "./useMahjongData/generateInitialData"
import Tile from "./Rack/Tile"

type Props = {
    children: ReactNode
    dispatch: ActionDispatch<[action: MahjongAction]>
    isTurn: boolean
}

export default function DraggingContext({ children, dispatch, isTurn }: Props) {
    const onDragStart: DragStartEvent = ({ operation: { source } }) => {
        console.log('Started dragging', source?.id);
    }

    const onDragOver: DragOverEvent = ({ operation: { source, target } }) => {
        if (!target || !source) return
        console.log(`Dragged ${source?.id} over ${target?.id}`);
        const targetId = String(target.id);
        if (targetId.startsWith("SLOT_")) {
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

        if (target.id === "DISCARD" && isTurn) {
            dispatch({
                type: 'DISCARD_TILE', payload: {
                    playerIndex: source.data.playerIndex,
                    tileIndex: source.data.tileIndex
                }
            })
        }
        else if (target.id === "PICK_UP_DISCARD") {
            dispatch({
                type: 'PICK_UP_DISCARD',
                payload: {
                    playerIndex: THIS_PLAYER
                }
            })
        }
        else if (target.id === "EXPOSED_RACK" && isTurn) {
            const tile = source.data.tile as MahjongTile

            // Check for a joker swap
            const jokerSwapIndex = getJokerSwapIndex(tile, target.data.player.exposed)
            if (jokerSwapIndex !== -1) {
                dispatch({
                    type: "JOKER_SWAP", payload: {
                        sourcePlayerIndex: 0,
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

        console.log(`Dropped ${source.id} onto ${target.id}`);
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