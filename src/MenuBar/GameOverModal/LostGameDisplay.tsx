import { useSelector } from "react-redux"
import { selectPlayers, selectWinningPlayer } from "../../_store/selectors"
import { THIS_PLAYER } from "../../constants"
import MiniRack from "./MiniRack"
import { sortTiles } from "../../_shared"

type Props = {}
export default function LostGameDisplay({ }: Props) {
  const players = useSelector(selectPlayers)
  const winningPlayer = useSelector(selectWinningPlayer)
  return (
    <div className="flex flex-col gap-3">
      {players.filter(player => player.index !== THIS_PLAYER).map(player => (
        <MiniRack tiles={player.exposed.concat(player.concealed.toSorted(sortTiles))} isWinner={player.index === winningPlayer} />
      ))}
      <div className="border-b-2 border-gray-400"/>
      <MiniRack tiles={players[THIS_PLAYER].exposed.concat(players[THIS_PLAYER].concealed)} />
    </div>
  )
}