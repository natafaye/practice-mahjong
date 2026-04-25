import clsx from "clsx"
import type { MahjongHand } from "../types"

type Props = {
  hand: MahjongHand,
  className?: string
}

export default function HandDisplayText({ hand, className }: Props) {
  return (
    <span>
      {hand.melds.map((set, index) => (
        <span key={index} className={clsx("pe-1",
          set.suit === "G" && "text-green-700",
          set.suit === "R" && "text-red-700",
          className
        )}>{set.numbers[0]}</span>
      ))}
    </span>
  )
}