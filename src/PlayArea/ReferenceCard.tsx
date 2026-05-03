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
  const [pinnedIds, setPinnedIds] = useState<string[]>([])
  const [maximized, setMaximized] = useState(false)
  const cardName = useSelector(selectCardName)
  const { hands, sections, handsBySection } = getHandsData(cardName)
  const stats = getWinStats()

  const pin = (id: string) => {
    if (pinnedIds.includes(id)) return
    if (pinnedIds.length === MAX_PINNED) return
    setPinnedIds([...pinnedIds, id])
  }

  const unpin = (id: string) => {
    setPinnedIds(pinnedIds.filter(i => i !== id))
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
              {handsBySection[section].map(hand => {
                const pinned = pinnedIds.includes(hand.id)
                return (
                  <ReferenceHand
                    key={hand.id}
                    hand={hand}
                    onClick={() => !pinned ? pin(hand.id) : unpin(hand.id)}
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
          {pinnedIds.map(id => (
            <ReferenceHand
              key={id}
              hand={hands.find(h => h.id === id)!}
              onClick={() => unpin(id)}
              winCount={stats[id] || 0}
              expanded
              pinned
            />
          ))}
          {pinnedIds.length === 0 && <span className="text-taupe-400">No hands pinned</span>}
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