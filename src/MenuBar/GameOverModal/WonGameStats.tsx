import { useSelector } from "react-redux"
import { selectPlayer, selectWinningHand } from "../../_store/selectors"
import { CARDS } from "../../_data/CARDS"
import CardSectionStats from "../CardSectionStats"
import { getWinStats } from "../../_store/localStorage"
import MiniRack from "./MiniRack"

type Props = {
  playerIndex: number
}

export default function WonGameStats({ playerIndex }: Props) {
  const winningPlayer = useSelector(selectPlayer(playerIndex))!
  const winningHandId = useSelector(selectWinningHand)
  const [cardName, index] = winningHandId!.split("_")
  const winningHand = CARDS.find(card => card.name === cardName)!.hands[parseInt(index)]
  const stats = getWinStats()
  return (
    <div>
      <MiniRack tiles={winningPlayer.exposed.slice(0, -1)} isWinner={true}/>
      <CardSectionStats
        section={winningHand.section}
        cardName={cardName}
        stats={stats}
        highlightedHandID={winningHandId}
      />
    </div>
  )
}