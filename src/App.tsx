import '@fontsource-variable/noto-sans-kr/wght.css';
import { useState, useEffect } from "react";
import Rack from "./Rack";
import PlayArea from "./PlayArea";
import { useTheme } from "./useTheme/useTheme";
import useMahjongData from "./useMahjongData";
import useAIPlayer from "./useAIPlayers";
import { DraggingContext } from './drag-and-drop';
import { THIS_PLAYER, GAME_OVER, CHARLESTONS } from "./constants";
import MenuBar from './MenuBar';

export default function App() {
  const { players, currentPlayer, gameState } = useMahjongData()
  const { table, rackDark } = useTheme()
  const [isIdle, setIsIdle] = useState(false)
  const [bouncingTileId, setBouncingTileId] = useState<string | null>(null)

  useAIPlayer(200, (tileId) => {
    setBouncingTileId(tileId)
    setTimeout(() => setBouncingTileId(null), 15000)
  })

  useEffect(() => {
    setIsIdle(false)
    if (currentPlayer !== THIS_PLAYER || gameState === GAME_OVER) return

    const interval = setInterval(() => {
      setIsIdle(true)
      setTimeout(() => setIsIdle(false), 5000)
    }, 30000)

    return () => {
      clearInterval(interval)
      setIsIdle(false)
    }
  }, [players, currentPlayer, gameState])

  return (
    <DraggingContext>
      <div className="fixed inset-0 overflow-hidden flex flex-col select-none"
        style={{ background: table }}
      >
        <div className="sm:flex gap-1.5" style={{ background: rackDark }}>
          {players.map((player, index) => index !== THIS_PLAYER && (
            <Rack
              key={index}
              player={player}
              concealed
              isCurrentPlayer={currentPlayer === index && !CHARLESTONS.includes(gameState)}
              size="sm"
              className="grow"
              bouncingTileId={bouncingTileId}
            />
          ))}
        </div>
        <PlayArea className="grow min-h-0" />
        <Rack
          className="shrink-0 vertical-shadow"
          player={players[THIS_PLAYER]}
          isCurrentPlayer={currentPlayer === THIS_PLAYER && !CHARLESTONS.includes(gameState)}
          isIdle={isIdle}
          bouncingTileId={bouncingTileId}
        />
        <MenuBar />
      </div>
    </DraggingContext>
  )
}