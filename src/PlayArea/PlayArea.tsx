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
  const { tableMid, tableDark } = useTheme()
  const seed = useSelector(selectSeed)
  const gameState = useSelector(selectGameState)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const passing = useSelector(selectPassing)
  const isCharleston = CHARLESTONS.includes(gameState)
  const { isDraggingGap, isDraggingJoker } = useIsDragging()

  return (
    <div className={clsx(className, "flex flex-col relative p-3 pt-0")}>
      <div className="flex flex-col md:flex-row grow gap-4 min-h-0">
        <div className="flex flex-col shrink-0 order-2 md:order-1 md:grow md:basis-0 min-h-0">
          <div className="pt-4 flex items-end gap-4 grow">
            <DrawSpot className="w-20 md:w-24 grow-0 mb-2" />
            {
              isCharleston ?
                <PassingSpot className="shrink-0 mb-2" /> :
                <DiscardSpot className="shrink-0 mb-2" />
            }
            <div className="grow self-stretch relative mb-2 h-28 md:h-auto">
              <div className="absolute inset-0 overflow-y-auto p-1 flex flex-col-reverse">
                <DiscardHistory className="flex flex-wrap" />
              </div>
            </div>
          </div>
        </div>
        <ReferenceCard key={seed} className="grow min-h-0 order-1 md:order-2 md:min-w-[50%] md:shrink-0 md:grow-0" />
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