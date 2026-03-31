import clsx from "clsx"
import Tile from "../Rack/Tile"
import { DISCARD, PLAYING, type MahjongData } from "../types"
import ReferenceCard from "./ReferenceCard"
import DiscardSpot from "./DiscardSpot"
import DrawSpot from "./DrawSpot"
import { type ActionDispatch } from "react"
import type { MahjongAction } from "../useMahjongData/useMahjongData"
import { useTheme } from "../useTheme"
import { THIS_PLAYER } from "../useMahjongData/generateInitialData"
import DropOverlay from "../DropOverlay"

type Props = {
    data: MahjongData
    dispatch: ActionDispatch<[action: MahjongAction]>
    className?: string
}

export default function PlayArea({ data, dispatch, className }: Props) {
    const { tableMid, tableDark } = useTheme()
    const { discard, wall, gameState, currentPlayer } = data

    return (
        <div className={clsx(className, "flex flex-col relative p-4 pb-0")}>
            <div className="min-h-[30%] overflow-y-auto grow mb-6 p-1">
                <div className="flex flex-wrap content-start">
                    {discard.slice(0, gameState === DISCARD ? -1 : discard.length).map((tile, index) => (
                        <Tile key={index} tile={tile} size="sm" />
                    ))}
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-6 min-h-0 shrink">
                <div className="md:contents flex items-end gap-6">
                    <DrawSpot className="w-25 grow md:grow-0 mb-4"
                        gameState={gameState}
                        currentPlayer={currentPlayer}
                        dispatch={dispatch}
                        wallNumber={wall.length}
                    />
                    <DiscardSpot className="shrink-0 md:order-last mb-4"
                        tile={gameState === DISCARD ? discard.at(-1) : undefined}
                        dispatch={dispatch}
                        gameState={gameState}
                    />
                </div>
                <ReferenceCard className="min-h-0 min-w-150 grow shrink order-first md:order-1" />
            </div>
            <DropOverlay
                dropId="DISCARD"
                show={gameState === PLAYING && currentPlayer === THIS_PLAYER}
                backgroundColor={tableMid}
                textShadowColor={tableDark}
            >
                Discard
            </DropOverlay>
        </div>
    )
}