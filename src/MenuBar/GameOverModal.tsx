import { useDispatch, useSelector } from "react-redux"
import { ActionCreators } from "redux-undo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons"
import { selectWinningPlayer } from "../_store/selectors"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "../Modal"
import Button from "../Button"
import { THIS_PLAYER } from "../constants"
import WonGameStats from "./WonGameStats"

type Props = {
  show: boolean
  setShow: (show: boolean) => void
  startNewGame: () => void
}

export default function GameOverModal({ show, setShow, startNewGame }: Props) {
  const winningPlayerIndex = useSelector(selectWinningPlayer)
  const isWinner = winningPlayerIndex === THIS_PLAYER
  const dispatch = useDispatch()
  return (
    <Modal show={show} setShow={setShow} size="lg">
      <ModalHeader setShow={setShow}>{isWinner ? "You Won!" : "You Lost"}</ModalHeader>
      <ModalBody>
        {isWinner && (
          <WonGameStats playerIndex={winningPlayerIndex} />
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          colors={{
            light: "var(--color-amber-600)",
            mid: "var(--color-amber-700)",
            dark: "var(--color-amber-800)"
          }}
          onClick={() => {
            setShow(false);
            dispatch(ActionCreators.jumpToPast(0))
          }}
        >
          <FontAwesomeIcon icon={faRefresh} /> Restart
        </Button>
        <Button
          colors={{
            light: "var(--color-amber-600)",
            mid: "var(--color-amber-700)",
            dark: "var(--color-amber-800)"
          }}
          onClick={() => {
            setShow(false);
            startNewGame()
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> New Game
        </Button>
      </ModalFooter>
    </Modal>
  )
}