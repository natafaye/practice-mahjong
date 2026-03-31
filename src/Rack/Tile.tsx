import clsx from "clsx"
import type { MahjongTile, Size } from "../types"
import { useTheme } from "../useTheme"

export type TileProps = {
    tile?: MahjongTile
    size?: Size
    selected?: boolean
    tipped?: boolean
    message?: string | number
}

const sizes = {
    sm: {
        shadowHeight: 4,
        tileClassName: "h-10 md:h-16",
        numberClassName: "text-xs md:text-base",
        suitClassName: "text-md md:text-2xl"
    },
    md: {
        shadowHeight: 5,
        tileClassName: "h-12 md:h-20",
        numberClassName: "text-lg",
        suitClassName: "text-3xl"
    },
    lg: {
        shadowHeight: 6,
        tileClassName: "h-14 md:h-24",
        numberClassName: "text-sm md:text-[1.4rem]",
        suitClassName: "text-2xl md:text-4xl"
    },
}

const generateBoxShadow = (height: number, tipped: boolean, topColor: string, bottomColor: string) => {
    let shadow = ""
    for (let i = 0; i < height; i++) {
        shadow += `${i}px ${i * (tipped ? -1 : 1)}px 0 ${i >= height / 2.5 ? topColor : bottomColor}, `
    }
    shadow += `${height * 0.9}px ${height * 0.9}px 8px rgba(0, 0, 0, 0.5)`
    return shadow
}

export default function Tile({ tile, size = "lg", selected = false, tipped = false, message = "" }: TileProps) {
    const { tileLight, tileDark } = useTheme()
    const { shadowHeight, tileClassName, numberClassName, suitClassName } = sizes[size]

    const tileStyle = !tile ? {
        backgroundColor: tileLight,
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