import Rack from "./Rack/Rack";
import PlayArea from "./PlayArea/PlayArea";
import { useMahjongData } from "./useMahjongData/useMahjongData";
import { generateTiles } from "./useMahjongData/generateTiles";
import '@fontsource-variable/noto-sans-kr/wght.css';
import "./shadows.css"
import { useTheme } from "./useTheme";

export default function App() {
  const [{ hands, wall, discard }, dispatch] = useMahjongData()
  const { table } = useTheme()

  return (
      <div className="absolute top-0 left-0 right-0 bottom-0 h-screen w-screen flex flex-col" style={{ background: table }}>
        <div className="flex gap-5">
          {hands.slice(1).map((hand, index) => (
            <Rack key={index} hand={hand} concealed size="md" className="grow" />
          ))}
        </div>
        <PlayArea discard={generateTiles().slice(12)} className="grow min-h-0" />
        <Rack hand={hands[0]} className="shrink-0" />
      </div>
  )
}