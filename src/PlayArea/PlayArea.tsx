import clsx from "clsx"
import ReferenceCard from "./ReferenceCard"
import DiscardSpot from "./DiscardSpot"
import DrawSpot from "./DrawSpot"
import { useTheme } from "../useTheme/useTheme"
import useMahjongData from "../useMahjongData"
import { DropOverlay, useIsDragging } from "../DraggingContext"
import { CHARLESTONS, PLAYING, THIS_PLAYER } from "../constants"
import PassingSpot from "./PassingSpot"
import { PLAY_AREA_ID } from "../DraggingContext/DraggingContext"
import DiscardHistory from "./DiscardHistory"

type Props = {
  className?: string
}

export default function PlayArea({ className }: Props) {
  const { tableMid, tableDark } = useTheme()
  const { gameState, currentPlayer, passing } = useMahjongData()
  const isCharleston = CHARLESTONS.includes(gameState)
  const { isDraggingGap, isDraggingJoker } = useIsDragging()

  return (
    <div className={clsx(className, "flex flex-col relative p-3 pt-0")}>
      <ReferenceCard className="min-h-0 grow shrink" />
      <div className="flex-row gap-6 shrink-0 mt-4">
        <div className="flex items-end gap-4">
          <DrawSpot className="w-20 lg:w-26 grow-0 mb-2" />
          {
            isCharleston ?
              <PassingSpot className="shrink-0 mb-2" /> :
              <DiscardSpot className="shrink-0 mb-2" />
          }
          <div className="grow self-stretch relative mb-2">
            <div className="absolute inset-0 overflow-y-auto p-1">
            <DiscardHistory className="flex flex-wrap pt-3"/>
            </div>
          </div>
        </div>
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