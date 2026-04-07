import clsx from "clsx"
import type { MahjongTile, Size } from "../types"
import { useTheme } from "../useTheme"
import { generateBoxShadow } from "./generateBoxShadow"
import { tileSizes } from "./tileSizes"

export type TileProps = {
    tile?: MahjongTile
    size?: Size
    selected?: boolean
    tipped?: boolean
    message?: string | number
}

export default function Tile({ tile, size = "lg", selected = false, tipped = false, message = "" }: TileProps) {
    const { tileLight, tileDark } = useTheme()
    const { shadowHeight, tileClassName, numberClassName, suitClassName } = tileSizes[size]

    const tileStyle = !tile ? {
        background: tileLight,
        borderColor: tileDark,
        boxShadow: generateBoxShadow(shadowHeight, tipped, "var(--color-taupe-200)", tileDark)
    } : {
        boxShadow: generateBoxShadow(shadowHeight, tipped, tileDark, "var(--color-taupe-200)")
    }

    return (
        <div
            className={clsx(
                "border aspect-[2.1/3] rounded-lg relative flex items-center justify-center",
                selected ? "bg-amber-100 border-amber-300" : "bg-taupe-50 border-taupe-200",
                tileClassName
            )}
            style={tileStyle}
        >
            {tile && (
                <>
                    <span className={clsx("absolute top-0 left-0 font-bold", numberClassName)}>
                        &nbsp;{tile.number}
                    </span>
                    <div className={clsx("text-shadow pt-1", suitClassName)}>
                        {tile.suit}
                    </div>
                </>
            )}
            { message && <div className="text-white text-[0.8rem] md:text-base text-center opacity-50">{message}</div>}
        </div>
    )
}