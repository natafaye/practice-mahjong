import type { ActionDispatch, ReactNode } from "react"
import { DragDropProvider, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/react"
import type { MahjongAction } from "./useMahjongData/useMahjongData"
import { getJokerSwapIndex } from "./useMahjongData/getJokerSwapIndex"
import type { MahjongTile } from "./types"
import { THIS_PLAYER } from "./useMahjongData/generateInitialData"

type Props = {
    children: ReactNode
    dispatch: ActionDispatch<[action: MahjongAction]>
    isTurn: boolean
}

export default function SortingContext({ children, dispatch, isTurn }: Props) {
    const onDragStart: DragStartEvent = ({ operation: { source } }) => {
        console.log('Started dragging', source?.id);
    }

    const onDragOver: DragOverEvent = ({ operation: { source, target } }) => {
        console.log(`Dragged ${source?.id} over ${target?.id}`);
    }

    const onDragEnd: DragEndEvent = ({ operation: { source, target, canceled } }) => {
        if (!target || !source || !isTurn || canceled) return

        if (target.id === "DISCARD") {
            dispatch({
                type: 'DISCARD_TILE', payload: {
                    playerIndex: source.data.playerIndex,
                    tileIndex: source.data.tileIndex
                }
            })
        }
        else if (target.id === "EXPOSED_RACK") {
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
            {/* <DragOverlay>
                {source => (<Tile tile={source.data as MahjongTile} />)}
            </DragOverlay> */}
        </DragDropProvider>
    )
}