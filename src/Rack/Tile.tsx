import clsx from "clsx"
import type { MahjongTile, Size } from "../types"
import { useTheme } from "../useTheme"

type Props = {
    tile: MahjongTile
    size?: Size
    selected?: boolean
    tipped?: boolean
    covered?: boolean
}

const sizes = {
    sm: 4,
    md: 6.5,
    lg: 7
}

const generateBoxShadow = (height: number, tipped: boolean, topColor: string, bottomColor: string) => {
    let shadow = ""
    for (let i = 0; i < height; i++) {
        shadow += `${i}px ${i * (tipped ? -1 : 1)}px 0 ${i >= height / 2.5 ? topColor : bottomColor}, `
    }
    shadow += `${height * 0.9}px ${height * 0.9}px 8px rgba(0, 0, 0, 0.5)`
    return shadow
}

export default function Tile({ tile, size = "lg", selected = false, tipped = false, covered = false }: Props) {
    const { tileLight, tileDark } = useTheme()

    if (covered)
        return <div
            className="border aspect-[2.1/3] rounded-lg"
            style={{ 
                height: sizes[size] + "rem",
                backgroundColor: tileLight,
                borderColor: tileDark,
                boxShadow: generateBoxShadow(sizes[size], tipped, "var(--color-taupe-200)", tileDark)
            }}
        ></div>

    return (
        <div
            className={clsx(
                "border aspect-[2.1/3] relative rounded-lg flex items-center justify-center select-none",
                selected ? "bg-amber-100 border-amber-300" : "bg-taupe-50 border-taupe-200"
            )}
            style={{ 
                height: sizes[size] + "rem",
                boxShadow: generateBoxShadow(sizes[size], tipped, tileDark, "var(--color-taupe-200)")
            }}
        >
            <span
                className="absolute top-0 left-0 font-bold"
                style={{ fontSize: sizes[size] / 4 + "rem" }}
            >
                &nbsp;{tile.number}
            </span>
            <div
                className="text-shadow"
                style={{ fontSize: sizes[size] / 2.5 + "rem" }}
            >
                {tile.suit}
            </div>
        </div>
    )
}