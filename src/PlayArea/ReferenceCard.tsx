import { useState } from "react"
import { faAngleDown, faAngleUp, faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import ReferenceHand from "./ReferenceHand"
import useMahjongData from "../useMahjongData"
import { getHandsData } from "../_shared"

type Props = {
  className?: string
}

export default function ReferenceCard({ className }: Props) {
  const [pinnedIndexes, setPinnedIndexes] = useState<number[]>([])
  const [maximized, setMaximized] = useState(false)
  const [expanded, setExpanded] = useState(true)

  const { cardName } = useMahjongData()
  const { hands, sections } = getHandsData(cardName)

  const pin = (index: number) => {
    if (pinnedIndexes.includes(index)) return
    setPinnedIndexes([...pinnedIndexes, index])
  }

  const unpin = (index: number) => {
    setPinnedIndexes(pinnedIndexes.filter(i => i !== index))
  }

  return (
    <div className={clsx(
      "flex flex-col align-top bg-white p-4 md:pb-0 rounded-lg md:rounded-b-none",
      maximized ? "absolute top-0 left-0 right-0 bottom-0 max-h-full" : "md:max-h-full",
      className
    )}>
      <div className="pb-2 flex">
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
            <FontAwesomeIcon icon={expanded ? faAngleDown : faAngleUp} />
          </button>}
        </div>
      </div>
      {(expanded || maximized) && (
        <div className="overflow-y-auto flex-1 min-h-0 pt-3 pb-4 border-t-taupe-400 border-t-2">
          <div className={clsx(maximized ? "columns-[34rem]" : "columns-[14rem]")}>
            {sections.map(section => (
              <div key={section} className="mb-3">
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
    </div>
  )
}