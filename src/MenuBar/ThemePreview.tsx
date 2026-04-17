import Rack from "../Rack"
import type { Theme } from "../useTheme/types"
import { ThemeContext } from "../useTheme/useTheme"
import { BAMS, CRAKS, DOTS, FLOWER_SUIT, JOKER_SUIT } from "../constants"
import clsx from "clsx"

const examplePlayer = { 
    index: 0, 
    exposed: [
        { suit: FLOWER_SUIT, id: "flower" },
        { suit: BAMS, number: 2, id: "bams_2" },
        { suit: DOTS, number: 3, id: "dots_3" },
        { suit: CRAKS, number: "D", id: "craks_d" },
        { suit: JOKER_SUIT, id: "joker" },
    ], 
    concealed: [] 
}

type Props = {
    theme: Theme
    className?: string
}

export default function ThemePreview({ theme, className }: Props) {
    return (
        <div className={clsx(className, "rounded-xl overflow-hidden mt-4 border-2")}>
            <ThemeContext.Provider value={{ ...theme, setTheme: () => { } }}>
                <div className="pt-8" style={{ background: theme.table }}>
                    <Rack player={examplePlayer} size="lg" />
                </div>
            </ThemeContext.Provider >
        </div>
    )
}