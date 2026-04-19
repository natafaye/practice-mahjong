import clsx from "clsx";
import { useTheme } from "../useTheme";
import Button from "../Button";
import useMahjongData from "../useMahjongData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCircleLeft, faCircleRight, faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { LEFT, NORMAL_PASS, OVER, RIGHT, THIS_PLAYER } from "../constants";
import DraggableTile from "../Tile/DraggableTile";
import { PASSING_ID } from "../DraggingContext/DraggingContext";

type Props = {
    className?: string
}

export default function PassingSpot({ className }: Props) {
    const { tableMid, tableDark, tableVeryDark } = useTheme()
    const { gameState, passing, readyToPass, dispatch } = useMahjongData()
    const [direction, type] = gameState.split("_")
    const widthClasses = "w-39 lg:w-46 xl:w-55"
    const passingDisabled = readyToPass[THIS_PLAYER] || type === NORMAL_PASS && passing[THIS_PLAYER].length < 3
    const canStopCharleston = gameState === "LEFT_B_1"

    return (
        <div className={clsx(className, "flex flex-col items-center")}>
            {canStopCharleston && (
                <Button
                    className={clsx(widthClasses, "mb-5")}
                    colors={{
                      light: tableMid,
                      mid: tableDark,
                      dark: tableVeryDark,
                    }}
                    onClick={() => dispatch({ type: "CANCEL_CHARLESTON" })}
                >
                    <FontAwesomeIcon icon={faCancel} className="text-lg me-2" />
                    Stop Passing
                </Button>
            )}
            <div className={clsx(
                widthClasses,
                "aspect-[5.36/3] flex justify-center items-center border-2 border-dashed rounded-lg p-4 ps-3 pt-3 mb-2"
            )}
                style={{ background: tableMid, borderColor: tableDark }}
            >
                {!readyToPass[THIS_PLAYER] ? (
                    passing[THIS_PLAYER].map((tile, index) => (
                        <DraggableTile key={tile.id} tile={tile} playerIndex={PASSING_ID} index={index} />
                    ))
                ) : (
                    <span className="text-sm lg:text-base ms-1" style={{ color: tableDark }}>Waiting...</span>
                )}
            </div>
            <Button
                className={clsx(widthClasses, "flex items-center justify-center")}
                colors={{
                    light: tableMid,
                    mid: tableDark,
                    dark: tableVeryDark,
                }}
                disabled={passingDisabled}
                onClick={() => dispatch({ type: "MARK_READY_TO_PASS", payload: { playerIndex: THIS_PLAYER } })}
            >
                <FontAwesomeIcon
                    icon={{ [LEFT]: faCircleLeft, [RIGHT]: faCircleRight, [OVER]: faCircleUp }[direction]!}
                    className="text-lg me-1"
                />
                Pass
            </Button>
        </div>
    )
}