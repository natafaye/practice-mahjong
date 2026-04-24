import { useSelector, useDispatch } from 'react-redux';
import { selectGameState, selectPassing, selectReadyToPass } from '../store/selectors';
import { markReadyToPass, cancelCharleston } from '../store/gameSlice';
import clsx from "clsx";
import { useTheme } from "../useTheme";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCircleLeft, faCircleRight, faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { LEFT, NORMAL_PASS, OVER, RIGHT, THIS_PLAYER } from "../constants";
import DraggableTile from "../Tile/DraggableTile";
import { PASSING_ID } from "../DraggingContext/DraggingContext";

type Props = {
  className?: string
}

export default function PassingSpot({ className }: Props) {
  const dispatch = useDispatch()
  const { tableMid, tableDark, tableVeryDark } = useTheme()
  const gameState = useSelector(selectGameState)
  const passing = useSelector(selectPassing)
  const readyToPass = useSelector(selectReadyToPass)
  const [direction, type] = gameState.split("_")
  const widthClasses = "w-34 lg:w-42 xl:w-53"
  const passingDisabled = readyToPass[THIS_PLAYER] || type === NORMAL_PASS && passing[THIS_PLAYER].length < 3
  const canStopCharleston = gameState === "LEFT_B_1"
  const buttonColors = { light: tableMid, mid: tableDark, dark: tableVeryDark }

  return (
    <>
      <div className={clsx(className, "flex flex-col items-center")}>
        <div className={clsx(
          widthClasses,
          "aspect-[5.7/3] flex justify-center items-center border-2 border-dashed rounded-lg pe-1 pb-1 mb-2"
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
          colors={buttonColors}
          disabled={passingDisabled}
          onClick={() => dispatch(markReadyToPass({ playerIndex: THIS_PLAYER }))}
        >
          <FontAwesomeIcon
            icon={{ [LEFT]: faCircleLeft, [RIGHT]: faCircleRight, [OVER]: faCircleUp }[direction]!}
            className="text-lg me-1"
          />
          Pass
        </Button>
      </div>
      {canStopCharleston && (
        <div className="mb-2 -ms-2">
          <Button
            colors={buttonColors}
            onClick={() => dispatch(cancelCharleston())}
          >
            <FontAwesomeIcon icon={faCancel} className="text-lg me-2" />
            Stop Passing
          </Button>
        </div>
      )}
    </>
  )
}