import Rack from "./Rack/Rack";
import PlayArea from "./PlayArea/PlayArea";
import SortingContext from "./SortingContext";
import { useMahjongData } from "./useMahjongData/useMahjongData";
import { useTheme } from "./useTheme";
import { THIS_PLAYER } from "./useMahjongData/generateInitialData";
import useAIPlayer from "./useAIPlayers/useAIPlayer";
import '@fontsource-variable/noto-sans-kr/wght.css';

export default function App() {
  const [data, dispatch] = useMahjongData()
  const { players, currentPlayer, melding } = data
  const { table } = useTheme()

  useAIPlayer(data, dispatch, 400)

  return (
    <SortingContext dispatch={dispatch} isTurn={currentPlayer === THIS_PLAYER}>
      <div className="absolute top-0 left-0 right-0 bottom-0 h-screen w-screen flex flex-col select-none"
        style={{ background: table }}
      >
        <div className="sm:flex gap-5">
          {players.slice(1).map((player, index) => (
            <Rack
              key={index}
              player={player}
              isTurn={currentPlayer === player.index }
              dispatch={dispatch}
              concealed
              size="md"
              className="grow"
            />
          ))}
        </div>
        <PlayArea
          data={data}
          dispatch={dispatch}
          className="grow min-h-0"
        />
        <Rack
          player={players[THIS_PLAYER]}
          isTurn={currentPlayer === THIS_PLAYER}
          melding={melding}
          dispatch={dispatch}
          className="shrink-0"
        />
        {/* <MenuBar dispatch={dispatch}/> */}
      </div>
    </SortingContext>
  )
}