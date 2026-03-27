import clsx from "clsx"
import type { MahjongHandData } from "../types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbtack } from "@fortawesome/free-solid-svg-icons"

type Props = {
    hand: MahjongHandData
    expanded?: boolean
    pinned?: boolean
    onClick?: () => void
}

export default function ReferenceHand({ hand, onClick, expanded = false, pinned = false }: Props) {
    return (
        <button
            className="text text-left w-full flex justify-between gap-1 even:bg-gray-200 whitespace-nowrap"
            onClick={onClick}
        >
            <span>
                {(expanded || pinned) && (
                    <FontAwesomeIcon icon={faThumbtack} size="sm" className={pinned ? "black" : "text-gray-400"} />
                )}
                {hand.sets.map((set, index) => (
                    <span key={index} className={clsx("pe-1",
                        set.suit === "G" && "text-green-700",
                        set.suit === "R" && "text-red-700"
                    )}>{set.numbers[0]}</span>
                ))}
            </span>
            <span className="text-taupe-600 text-sm me-1">
                {expanded && <span className="me-2">({hand.text})</span>}
                {hand.concealed ? "C" : expanded && "X"}
                {expanded && hand.value}
            </span>
        </button>
    )
}