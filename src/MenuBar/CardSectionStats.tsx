import clsx from "clsx"
import { getHandsData } from "../_shared"
import HandDisplayText from "../PlayArea/HandDisplayText"
import type { WinCounts } from "../_store/localStorage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

type Props = {
  cardName: string
  section: string
  highlightedHandID?: string
  stats: WinCounts
}
export default function CardSectionStats({ cardName, section, highlightedHandID, stats }: Props) {
  const handsData = getHandsData(cardName)
  const sectionHands = handsData.hands.filter(hand => hand.section === section)
  const handsWithWin = sectionHands.filter(hand => stats[hand.id]).length
  const percentage = 100 * handsWithWin / sectionHands.length
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center gap-2 mb-2">
        <h3 className={clsx(
          "text-xl font-medium",
          percentage === 100 && "text-amber-500 font-bold"
        )}>
          {section}
          {percentage === 100 && (
            <FontAwesomeIcon icon={faStar} className="ms-1 text-amber-400 animate-twinkle" />
          )}
        </h3>
        <div className="font-bold ms-auto">{handsWithWin}/{sectionHands.length}</div>
        <div className={clsx(
          "bg-gray-100 border h-3 min-w-30 mt-1",
          percentage === 100 ? "border-amber-400" : percentage === 0 ? "border-gray-300" : "border-emerald-600"
        )}>
          <div
            className={clsx(
              "h-full",
              percentage === 100 ? "bg-amber-400" : "bg-emerald-600"
            )}
            style={{ width: percentage + "%" }}
          />
        </div>
      </div>
      <table className="w-full">
        <tbody>
          {sectionHands.map(hand => (
            <tr key={hand.id} className={clsx(
              hand.id === highlightedHandID ? "font-bold bg-amber-100" : "odd:bg-gray-100"
            )}>
              <td className="p-1 px-2"><HandDisplayText hand={hand} /></td>
              <td className="p-1 px-2 text-taupe-600 text-sm min-w-0 flex items-baseline w-full">
                <span className="me-2 truncate font-sans">({hand.text})</span>
              </td>
              <td className="p-1 px-2 text-end">
                {stats[hand.id] || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}