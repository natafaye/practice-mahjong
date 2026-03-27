import Tile from "./Tile"
import { GAP, type MahjongHand, type Size } from "../types"
import { useTheme } from "../useTheme"
import clsx from "clsx"

type Props = {
    hand: MahjongHand
    size?: Size
    concealed?: boolean
    className?: string
}

export default function Rack({ hand, size = "lg", className, concealed = false }: Props) {
    const { rackLight, rackDark } = useTheme()
    return (
        <div className={clsx(className, "overflow-x-auto overflow-y-hidden")}>
            <div className="w-max min-w-full">
                <div className="vertical-shadow" style={{ backgroundColor: rackLight }}>
                    <div className="h-3" style={{ backgroundColor: rackLight }}></div>
                    <div className="h-3 -mb-3" style={{ backgroundColor: rackDark }}></div>
                    <div className="flex justify-center min-h-20 px-3">
                        {hand.exposed.map(tile => tile === GAP ?
                            <div key={tile} className="w-10"></div> :
                            <Tile key={tile.id} tile={tile} size={size} />
                        )}
                    </div>
                    <div className="h-3 -mb-3 vertical-shadow"></div>
                    <div className="h-3 relative" style={{ backgroundColor: rackLight }}></div>
                    <div className="h-3" style={{ backgroundColor: rackDark }}></div>
                </div>
                {!concealed && (
                    <div className="relative -mt-6" style={{ backgroundColor: rackDark }}>
                        <div className="h-3" style={{ backgroundColor: rackLight }}></div>
                        <div className="flex justify-center -mt-5 px-3">
                            {hand.unexposed.map(tile => tile === GAP ?
                                <div key={tile} className="w-10"></div> :
                                <Tile key={tile.id} tile={tile} size={size} tipped />
                            )}
                        </div>
                        <div className="h-3 -mt-3" style={{ backgroundColor: rackLight }}></div>
                        <div className="h-3 relative" style={{ backgroundColor: rackDark }}></div>
                    </div>
                )}
            </div>
        </div >
    )
}