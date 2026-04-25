import { ActionCreators } from 'redux-undo';
import { useState } from "react"
import { faCaretDown, faCaretRight, faNoteSticky, faPlay, faUser, faUserGroup, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "../Modal"
import Button from "../Button"
import RadioInput from "../RadioInput/RadioInput"
import { CARDS } from "../_data/CARDS"
import { useDispatch, useSelector } from "react-redux"
import { selectCardName } from "../_store/selectors"
import { newGame } from '../_store/gameSlice';

type Props = {
  show: boolean
  setShow: (show: boolean) => void
}

export default function NewGameModal({ show, setShow }: Props) {
  const cardName = useSelector(selectCardName)
  const dispatch = useDispatch()
  const [cardValue, setCardValue] = useState(cardName)
  const [numberValue, setNumberValue] = useState(4)
  const [seedValue, setSeedValue] = useState("")
  const [advancedExpanded, setAdvancedExpanded] = useState(false)

  const handleStart = () => {
    dispatch(newGame({
      cardName: cardValue,
      numberOfPlayers: numberValue,
      seed: seedValue
    }))
    dispatch(ActionCreators.clearHistory())
    setShow(false)
    setAdvancedExpanded(false)
    setSeedValue("")
  }

  return (
    <Modal show={show} setShow={setShow}>
      <ModalHeader setShow={setShow} className="text-amber-700">New Game</ModalHeader>
      <ModalBody>
        <label className="">Mahjong Card</label>
        <div className="flex gap-3 mb-6 mt-2">
          {CARDS.map(({ name }) => (
            <RadioInput
              key={name}
              value={name}
              name="mahjong-card"
              checked={cardValue === name}
              onChange={() => setCardValue(name)}
              className="items-center"
            >
              <FontAwesomeIcon icon={faNoteSticky} className="me-1" />
              {name}
            </RadioInput>
          ))}
        </div>
        <label className="">Number of Players</label>
        <div className="flex gap-3 mt-2">
          {[1, 2, 3, 4].map(number => (
            <RadioInput
              key={number}
              value={number}
              name="number-of-players"
              checked={numberValue === number}
              onChange={() => setNumberValue(number)}
              className="items-center"
            >
              {number}
              <FontAwesomeIcon
                icon={[faUser, faUserGroup, faUsers, faUsers][number - 1]}
                className="ms-1 pe-0.5"
              />
            </RadioInput>
          ))}
        </div>
        <div className="mt-3">
          <button className="text-sm w-full flex items-center gap-2" onClick={() => setAdvancedExpanded(!advancedExpanded)}>
            <hr className="grow" />
            <span><FontAwesomeIcon icon={advancedExpanded ? faCaretDown : faCaretRight} /> Advanced</span>
            <hr className="grow" />
          </button>
          {advancedExpanded && (
            <div className="mt-4 flex items-center gap-3">
              <label htmlFor="seed-textbox">Seed</label>
              <input
                id="seed-textbox"
                type="text"
                className="border border-gray-300 rounded grow p-1"
                value={seedValue}
                onChange={(event) => setSeedValue(event.target.value)}
              />
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          colors={{
            light: "var(--color-amber-600)",
            mid: "var(--color-amber-700)",
            dark: "var(--color-amber-800)"
          }}
          onClick={handleStart}
        >
          <FontAwesomeIcon icon={faPlay} /> Start Game
        </Button>
      </ModalFooter>
    </Modal>
  )
}