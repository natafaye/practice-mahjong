import { useSelector, useDispatch } from 'react-redux';
import { selectDiscard, selectGameState } from '../_store/selectors';
import { skipDiscard } from '../_store/gameSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons"
import DraggableTile from "../Tile/DraggableTile"
import Button from "../Button"
import { useTheme } from "../useTheme/useTheme"
import { DISCARD_ID } from "../DraggingContext"
import { DISCARD, THIS_PLAYER } from "../constants"
import clsx from "clsx"

type Props = {
    className?: string
}

export default function DiscardSpot({ className }: Props) {
    const dispatch = useDispatch()
    const { tableMid, tableDark, tableVeryDark } = useTheme()
    const discard = useSelector(selectDiscard)
    const gameState = useSelector(selectGameState)
    const tile = gameState === DISCARD ? discard.at(-1) : undefined

    return (
        <div className={className}>
            <div className={clsx(
                "aspect-[2.3/3] flex justify-center items-center border-2 border-dashed rounded-lg p-2 ps-1 pt-1 mb-2",
                "w-14 lg:w-18 xl:w-22"
            )}
                style={{ background: tableMid, borderColor: tableDark }}
            >
                {tile ?
                    <DraggableTile key={tile.id} tile={tile} playerIndex={DISCARD_ID} /> :
                    <span className="text-xs md:text-sm lg:text-base ms-1" style={{ color: tableDark }}>Discard</span>
                }
            </div>
            <Button
                className={"min-w-14 lg:min-w-18 xl:w-22"}
                colors={{
                    light: tableMid,
                    mid: tableDark,
                    dark: tableVeryDark
                }}
                disabled={gameState !== DISCARD}
                onClick={() => dispatch(skipDiscard({ playerIndex: THIS_PLAYER }))}
            >
                <FontAwesomeIcon icon={faArrowUpFromBracket} className="me-1" rotation={90} />
                Skip
            </Button>
        </div>
    )
}