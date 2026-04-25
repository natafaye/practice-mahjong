import { useSelector } from "react-redux"
import { useTheme } from "../useTheme"
import { selectPlayer, selectWinningHand } from "../_store/selectors"
import { CARDS } from "../_data/CARDS"
import Tile from "../Tile/Tile"
import CardSectionStats from "./CardSectionStats"
import { getWinStats } from "../_store/localStorage"

type Props = {
  playerIndex: number
}
export default function WonGameStats({ playerIndex }: Props) {
  const winningPlayer = useSelector(selectPlayer(playerIndex))
  const winningHandId = useSelector(selectWinningHand)
  const [cardName, index] = winningHandId!.split("_")
  const winningHand = CARDS.find(card => card.name === cardName)!.hands[parseInt(index)]
  const { rackMid } = useTheme()
  const stats = getWinStats()
  console.log(winningPlayer)
  return (
    <div>
      <div className="flex justify-center p-3" style={{ background: rackMid }}>
        {winningPlayer && winningPlayer.exposed.slice(0, -1).map((tile, index) => (
          typeof tile === "string" ? <div key={index} className="w-5"></div> :
            <Tile key={tile.id} tile={tile} size="sm" />
        ))}
      </div>
      <CardSectionStats
        section={winningHand.section}
        cardName={cardName}
        stats={stats}
        highlightedHandID={winningHandId}
      />
    </div>
  )
}