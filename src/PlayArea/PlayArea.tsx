import clsx from "clsx"
import Tile from "../Rack/Tile"
import { DISCARD, PLAYING, type MahjongData } from "../types"
import ReferenceCard from "./ReferenceCard"
import DiscardSpot from "./DiscardSpot"
import DrawSpot from "./DrawSpot"
import { useDroppable } from "@dnd-kit/react"
import { type ActionDispatch } from "react"
import type { MahjongAction } from "../useMahjongData/useMahjongData"
import { useTheme } from "../useTheme"
import { THIS_PLAYER } from "../useMahjongData/generateInitialData"

type Props = {
    data: MahjongData
    dispatch: ActionDispatch<[action: MahjongAction]>
    className?: string
}

export default function PlayArea({ data, dispatch, className }: Props) {
    const { tableMid } = useTheme()
    const { discard, wall, gameState, currentPlayer } = data
    const { ref, isDropTarget } = useDroppable({
        id: "DISCARD"
    })

    return (
        <div className={clsx(className, "flex flex-col relative p-4 pb-0")} ref={ref}>
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
            <div
                className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center"
                style={{ display: isDropTarget && gameState === PLAYING && currentPlayer === THIS_PLAYER ? "flex" : "none" }}
            >
                <div
                    className="absolute top-0 left-0 right-0 bottom-0 opacity-80 starting:opacity-0 transition-opacity"
                    style={{ backgroundColor: tableMid }}
                ></div>
                <p className="relative text-4xl font-bold p-1 rounded-lg text-shadow-fuchsia-400 text-white text-shadow-md ">Discard</p>
            </div>
        </div>
    )
}