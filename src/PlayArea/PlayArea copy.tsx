import { useSelector } from 'react-redux';
import { selectGameState, selectCurrentPlayer, selectPassing, selectSeed } from '../_store/selectors';
import clsx from "clsx"
import ReferenceCard from "./ReferenceCard"
import DiscardSpot from "./DiscardSpot"
import DrawSpot from "./DrawSpot"
import { useTheme } from "../useTheme/useTheme"
import { DropOverlay, useIsDragging } from "../DraggingContext"
import { CHARLESTONS, PLAYING, THIS_PLAYER } from "../constants"
import PassingSpot from "./PassingSpot"
import { PLAY_AREA_ID } from "../DraggingContext/DraggingContext"
import DiscardHistory from "./DiscardHistory"

type Props = {
  className?: string
}

export default function PlayArea({ className }: Props) {
  const { tableMid, tableDark, tableLight } = useTheme()
  const seed = useSelector(selectSeed)
  const gameState = useSelector(selectGameState)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const passing = useSelector(selectPassing)
  const isCharleston = CHARLESTONS.includes(gameState)
  const { isDraggingGap, isDraggingJoker } = useIsDragging()

  return (
    <div className={clsx(className, "flex flex-col relative p-3 pt-0")}>
      <ReferenceCard key={seed} className="min-h-0" />
      <div className="shrink-0 mt-auto pt-4 flex items-end gap-4">
        <DrawSpot className="w-20 lg:w-24 grow-0 mb-2" />
        {
          isCharleston ?
            <PassingSpot className="shrink-0 mb-2" /> :
            <DiscardSpot className="shrink-0 mb-2" />
        }
        <div className="grow self-stretch relative mb-2">
          <div className="absolute inset-0 overflow-y-auto p-1 flex flex-col-reverse">
            <DiscardHistory className="flex flex-wrap" />
          </div>
          <div
            className="absolute top-0 inset-x-0 h-1 z-1 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, ${tableLight}, transparent)` }}
          />
          <div
            className="absolute bottom-0 inset-x-0 h-1 z-1 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, transparent, ${tableLight})` }}
          />
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