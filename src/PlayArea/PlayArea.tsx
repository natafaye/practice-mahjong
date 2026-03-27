import clsx from "clsx"
import Tile from "../Rack/Tile"
import type { MahjongTile } from "../types"
import ReferenceCard from "./ReferenceCard"
import { useTheme } from "../useTheme"

type Props = {
    discard: MahjongTile[]
    className?: string
}
export default function PlayArea({ discard, className }: Props) {
    const { tableMid, tableDark } = useTheme()
    return (
        <div className={clsx(className, "p-4 pb-0 flex flex-col relative")}>
            <div className="grow min-h-0 overflow-y-auto mb-5 p-1">
                <div className="flex flex-wrap content-start">
                    {discard.slice(0, -1).map((tile, index) => (
                        <Tile key={index} tile={tile} size="sm" />
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap justify-between gap-6">
                <div className="flex justify-end w-25 grow md:grow-0 mb-8 self-end">
                    <Tile tile={{ suit: "", id: "" }} covered />
                    <Tile tile={{ suit: "", id: "" }} covered />
                    <Tile tile={{ suit: "", id: "" }} covered />
                    <Tile tile={{ suit: "", id: "" }} covered />
                </div>
                <div
                    className="flex justify-center border-2 border-dashed p-4 ps-3 mb-4 order-last self-end"
                    style={{ background: tableMid, borderColor: tableDark }}
                >
                    {discard.length > 0 && (
                        <Tile tile={discard[discard.length - 1]} />
                    )}
                </div>
                <ReferenceCard className="grow shrink min-w-60 order-first md:order-2" />
            </div>
        </div>
    )
}