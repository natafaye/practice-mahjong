import '@fontsource-variable/noto-sans-kr/wght.css';
import { useSelector } from 'react-redux';
import { selectPlayers, selectCurrentPlayer } from './_store/selectors';
import Rack from "./Rack";
import PlayArea from "./PlayArea";
import { useTheme } from "./useTheme/useTheme";
import { DraggingContext } from './DraggingContext';
import { THIS_PLAYER } from "./constants";
import MenuBar from './MenuBar';

export default function App() {
  const players = useSelector(selectPlayers)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const { tableLight, rackDark, rackLight } = useTheme()

  return (
    <DraggingContext>
      <div className="fixed inset-0 overflow-hidden flex flex-col select-none"
        style={{ background: tableLight }}
      >
        <div className="sm:flex">
          {players.map((player, index) => index !== THIS_PLAYER && (
            <Rack
              key={index}
              player={player}
              concealed
              isCurrentPlayer={currentPlayer === index}
              size="sm"
              className={"grow sm:mt-0"}
            />
          ))}
        </div>
        <div>
          <div className="h-1.5 lg:h-2 relative vertical-shadow" style={{ background: rackLight }}></div>
          <div className="h-1.5 lg:h-2" style={{ background: rackDark }}></div>
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