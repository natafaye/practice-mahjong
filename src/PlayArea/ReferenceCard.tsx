import { useSelector } from 'react-redux';
import { selectCardName } from '../_store/selectors';
import { useState } from "react"
import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import ReferenceHand from "./ReferenceHand"
import { getHandsData } from "../_shared"
import { getWinStats } from '../_store/localStorage';

const MAX_PINNED = 6

type Props = {
  className?: string
}

export default function ReferenceCard({ className }: Props) {
  const [pinnedIndexes, setPinnedIndexes] = useState<number[]>([])
  const [maximized, setMaximized] = useState(false)
  const cardName = useSelector(selectCardName)
  const { hands, sections } = getHandsData(cardName)
  const stats = getWinStats()

  const pin = (index: number) => {
    if (pinnedIndexes.includes(index)) return
    if (pinnedIndexes.length === MAX_PINNED) return
    setPinnedIndexes([...pinnedIndexes, index])
  }

  const unpin = (index: number) => {
    setPinnedIndexes(pinnedIndexes.filter(i => i !== index))
  }

  return (
    <div className={clsx(
      "flex flex-col align-top bg-white p-4 pt-0 rounded-lg rounded-t-none min-h-0 grow-shrink",
      maximized && "absolute top-0 left-0 right-0 bottom-0 max-h-full z-20",
      className
    )}>
      <div className="overflow-y-auto flex-1 min-h-0 pb-3 pt-4 border-b-taupe-400 border-b-2">
        <div className={clsx(maximized ? "columns-[34rem]" : "columns-[14rem]")}>
          {sections.map(section => (
            <div key={section} className="mb-3 break-inside-avoid-column">
              <h3 className="font-bold">{section}</h3>
              {hands.filter(hand => hand.section === section).map((hand, index) => {
                const pinned = pinnedIndexes.includes(hands.indexOf(hand))
                return (
                  <ReferenceHand
                    key={section + "_" + index}
                    hand={hand}
                    onClick={() => !pinned ? pin(hands.indexOf(hand)) : unpin(hands.indexOf(hand))}
                    winCount={stats[hand.id] || 0}
                    expanded={maximized}
                    pinned={pinned}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 flex">
        <div className="grow shrink min-w-0 columns-1 2xl:columns-2">
          {pinnedIndexes.map(index => (
            <ReferenceHand
              key={index}
              hand={hands[index]}
              onClick={() => unpin(index)}
              winCount={stats[hands[index].id] || 0}
              expanded
              pinned
            />
          ))}
          {pinnedIndexes.length === 0 && <span className="text-taupe-400">No hands pinned</span>}
        </div>
        <div className="text-end shrink">
          <button
            className="text-taupe-600 md:text-2xl ms-auto ps-3"
            onClick={() => setMaximized(!maximized)}
          >
            <FontAwesomeIcon icon={maximized ? faMinimize : faMaximize} />
          </button>
        </div>
      </div>
    </div>
  )
}