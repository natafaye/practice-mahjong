import '@fontsource-variable/noto-sans-kr/wght.css';
import Rack from "./Rack";
import PlayArea from "./PlayArea";
import { useTheme } from "./useTheme/useTheme";
import useMahjongData from "./useMahjongData";
import useAIPlayer from "./useAIPlayers";
import { DraggingContext } from './drag-and-drop';
import { THIS_PLAYER } from "./constants";
import MenuBar from './MenuBar';

export default function App() {
  const { players, currentPlayer } = useMahjongData()
  const { table, rackDark } = useTheme()
  useAIPlayer(200)

  return (
    <DraggingContext>
      <div className="fixed inset-0 overflow-hidden flex flex-col select-none"
        style={{ background: table }}
      >
        <div className="sm:flex gap-2" style={{ background: rackDark }}>
          {players.map((player, index) => index !== THIS_PLAYER && (
            <Rack
              key={index}
              player={player}
              concealed
              isCurrentPlayer={currentPlayer === index}
              size="md"
              className="grow"
            />
          ))}
        </div>
        <PlayArea className="grow min-h-0" />
        <Rack
          className="shrink-0 vertical-shadow"
          player={players[THIS_PLAYER]}
          isCurrentPlayer={currentPlayer === THIS_PLAYER}
        />
        <MenuBar />
      </div>
    </DraggingContext>
  )
}