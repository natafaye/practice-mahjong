import clsx from "clsx"
import Tile from "../Tile/Tile"
import ReferenceCard from "./ReferenceCard"
import DiscardSpot from "./DiscardSpot"
import DrawSpot from "./DrawSpot"
import { useTheme } from "../useTheme/useTheme"
import useMahjongData from "../useMahjongData"
import { DropOverlay, useIsDragging } from "../DraggingContext"
import { CHARLESTONS, DISCARD, PLAYING, THIS_PLAYER } from "../constants"
import PassingSpot from "./PassingSpot"
import { PLAY_AREA_ID } from "../DraggingContext/DraggingContext"

type Props = {
    className?: string
}

export default function PlayArea({ className }: Props) {
    const { tableMid, tableDark } = useTheme()
    const { discard, gameState, currentPlayer, passing } = useMahjongData()
    const isCharleston = CHARLESTONS.includes(gameState)
    const { isDraggingGap, isDraggingJoker } = useIsDragging()

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
                    <DrawSpot className="w-25 grow md:grow-0 mb-4" />
                    {
                        isCharleston ?
                            <PassingSpot className="shrink-0 md:order-last mb-4" /> :
                            <DiscardSpot className="shrink-0 md:order-last mb-4" />
                    }
                </div>
                <ReferenceCard className="min-h-0 grow shrink order-first md:order-1" />
            </div>
            <DropOverlay
                dropId={PLAY_AREA_ID}
                show={!isDraggingGap && (
                    isCharleston && passing[THIS_PLAYER].length < 3 && !isDraggingJoker ||
                    gameState === PLAYING && currentPlayer === THIS_PLAYER
                )}
                background={tableMid}
                textShadowColor={tableDark}
            >
                {isCharleston ? "Add to Pass" : "Discard"}
            </DropOverlay>
        </div>
    )
}