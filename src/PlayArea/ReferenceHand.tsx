import type { MahjongHand } from "../types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbtack } from "@fortawesome/free-solid-svg-icons"
import HandDisplayText from "./HandDisplayText"

type Props = {
  hand: MahjongHand
  expanded?: boolean
  pinned?: boolean
  winCount: number
  onClick?: () => void
}

export default function ReferenceHand({ hand, winCount, onClick, expanded = false, pinned = false }: Props) {
  return (
    <button
      className="text text-left w-full flex justify-between items-baseline gap-1 p-1 even:bg-gray-200 whitespace-nowrap"
      onClick={onClick}
    >
      <span className="shrink-0">
        {(expanded || pinned) && (
          <FontAwesomeIcon icon={faThumbtack} size="sm" className={pinned ? "black" : "text-gray-400"} />
        )}
        <HandDisplayText hand={hand} />
      </span>
      <span className="text-taupe-600 text-sm me-1 min-w-0 flex items-baseline justify-end w-full">
        {expanded && <span className="me-2 truncate font-sans">({hand.text})</span>}
        {hand.concealed && (
          <span className="bg-gray-400 px-1 rounded text-white">C</span>
        )}
        <span className="ms-2">{winCount}</span>
      </span>
    </button>
  )
}