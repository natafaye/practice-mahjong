import { useSelector } from 'react-redux';
import { selectCardName } from '../_store/selectors';
import { useState } from "react"
import { faAngleDown, faAngleUp, faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import ReferenceHand from "./ReferenceHand"
import { getHandsData } from "../_shared"

const MAX_PINNED = 6

type Props = {
  className?: string
}

export default function ReferenceCard({ className }: Props) {
  const [pinnedIndexes, setPinnedIndexes] = useState<number[]>([])
  const [maximized, setMaximized] = useState(false)
  const [expanded, setExpanded] = useState(true)

  const cardName = useSelector(selectCardName)
  const { hands, sections } = getHandsData(cardName)

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
      "flex flex-col align-top bg-white p-4 pt-0 rounded-lg rounded-t-none min-h-0",
      maximized ? "absolute top-0 left-0 right-0 bottom-0 max-h-full z-20" : "",
      (expanded || maximized) ? "grow shrink" : "shrink-0",
      className
    )}>
      {(expanded || maximized) && (
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
                      expanded={maximized}
                      pinned={pinned}
                      onClick={() => pin(hands.indexOf(hand))}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-2 flex">
        <div className="grow shrink min-w-0 columns-1 2xl:columns-2">
          {pinnedIndexes.map(index => (
            <ReferenceHand
              key={index}
              hand={hands[index]}
              onClick={() => unpin(index)}
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
          {!maximized && <button
            className="text-taupe-600 md:text-2xl ms-auto ps-3"
            onClick={() => setExpanded(!expanded)}
          >
            <FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} />
          </button>}
        </div>
      </div>
    </div>
  )
}