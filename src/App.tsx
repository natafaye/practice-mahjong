import '@fontsource-variable/noto-sans-kr/wght.css';
import Rack from "./Rack";
import PlayArea from "./PlayArea";
import { useTheme } from "./useTheme";
import useMahjongData from "./useMahjongData";
import useAIPlayer from "./useAIPlayers";
import { DraggingContext } from './drag-and-drop';
import { THIS_PLAYER } from "./constants";

export default function App() {
  const { players } = useMahjongData()
  const { table } = useTheme()
  useAIPlayer(200)

  return (
    <DraggingContext>
      <div className="absolute top-0 left-0 right-0 bottom-0 h-screen w-screen flex flex-col select-none"
        style={{ background: table }}
      >
        <div className="sm:flex gap-5">
          {players.map((player, index) => index !== THIS_PLAYER && (
            <Rack
              key={index}
              player={player}
              concealed
              size="md"
              className="grow"
            />
          ))}
        </div>
        <PlayArea className="grow min-h-0" />
        <Rack player={players[THIS_PLAYER]} className="shrink-0" />
      </div>
    </DraggingContext>
  )
}