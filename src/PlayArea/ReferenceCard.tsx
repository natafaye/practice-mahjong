import clsx from "clsx"
import { mahjongHands, mahjongHandSections } from "../useMahjongData/mahjongHands"
import { useState } from "react"
import { faAngleDown, faAngleUp, faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReferenceHand from "./ReferenceHand"

type Props = {
  className?: string
}

export default function ReferenceCard({ className }: Props) {
  const [pinnedIndexes, setPinnedIndexes] = useState<number[]>([])
  const [maximized, setMaximized] = useState(false)
  const [expanded, setExpanded] = useState(true)

  const pin = (index: number) => {
    if (pinnedIndexes.includes(index)) return
    setPinnedIndexes([...pinnedIndexes, index])
  }

  const unpin = (index: number) => {
    setPinnedIndexes(pinnedIndexes.filter(i => i !== index))
  }

  return (
    <div className={clsx(
      "flex flex-col align-top bg-white p-4 pb-0 rounded-lg rounded-b-none",
      maximized ? "absolute top-0 left-0 right-0 bottom-0" : "max-h-50",
      className
    )}>
      <div className="pb-2 flex">
        <div className="grow shrink columns-[34rem]">
          {pinnedIndexes.map(index => (
            <ReferenceHand
              key={index}
              hand={mahjongHands[index]}
              onClick={() => unpin(index)}
              expanded
              pinned
            />
          ))}
          {pinnedIndexes.length === 0 && <span className="text-taupe-400">No hands pinned</span>}
        </div>
        <div>
          <button className="text-taupe-600 text-2xl ms-auto ps-3" onClick={() => setMaximized(!maximized)}>
            <FontAwesomeIcon icon={maximized ? faMinimize : faMaximize} />
          </button>
          <button className="text-taupe-600 text-2xl ms-auto ps-3" onClick={() => setExpanded(!expanded)}>
            <FontAwesomeIcon icon={expanded ? faAngleDown : faAngleUp} />
          </button>
        </div>
      </div>
      {(expanded || maximized) && (
        <div className="overflow-y-auto h-full pt-3 border-t-taupe-400 border-t-2">
          <div className={clsx(maximized ? "columns-[34rem]" : "columns-[14rem]")}>
            {mahjongHandSections.map(section => (
              <div key={section} className="mb-3">
                <h3 className="font-bold text-lg">{section}</h3>
                {mahjongHands.filter(hand => hand.section === section).map((hand, index) => (
                  <ReferenceHand
                    key={index}
                    hand={hand}
                    expanded={maximized}
                    pinned={pinnedIndexes.includes(mahjongHands.indexOf(hand))}
                    onClick={() => pin(mahjongHands.indexOf(hand))}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}