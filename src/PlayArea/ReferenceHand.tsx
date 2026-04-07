import clsx from "clsx"
import type { MahjongHand } from "../types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbtack } from "@fortawesome/free-solid-svg-icons"

type Props = {
    hand: MahjongHand
    expanded?: boolean
    pinned?: boolean
    onClick?: () => void
}

export default function ReferenceHand({ hand, onClick, expanded = false, pinned = false }: Props) {
    return (
        <button
            className="text text-left w-full flex justify-between items-baseline gap-1 p-1 even:bg-gray-200 whitespace-nowrap"
            onClick={onClick}
        >
            <span className="shrink-0">
                {(expanded || pinned) && (
                    <FontAwesomeIcon icon={faThumbtack} size="sm" className={pinned ? "black" : "text-gray-400"} />
                )}
                {hand.melds.map((set, index) => (
                    <span key={index} className={clsx("pe-1",
                        set.suit === "G" && "text-green-700",
                        set.suit === "R" && "text-red-700"
                    )}>{set.numbers[0]}</span>
                ))}
            </span>
            <span className="text-taupe-600 text-sm me-1 min-w-0 flex items-baseline justify-end w-full">
                {expanded && <span className="me-2 truncate font-sans">({hand.text})</span>}
                <span>
                    {hand.concealed ? "C" : expanded && "X"}
                    {expanded && hand.value}
                </span>
            </span>
        </button>
    )
}