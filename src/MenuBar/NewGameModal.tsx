import { useState } from "react"
import { faNoteSticky, faPlay, faUser, faUserGroup, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, ModalHeader } from "../Modal"
import Button from "../Button"
import RadioInput from "../RadioInput/RadioInput"
import useMahjongData, { CARDS } from "../useMahjongData"

type Props = {
    show: boolean
    setShow: (show: boolean) => void
}

export default function NewGameModal({ show, setShow }: Props) {
    const { handsData, dispatch } = useMahjongData()
    const [cardValue, setCardValue] = useState(handsData.name)
    const [numberValue, setNumberValue] = useState(4)

    const handleStart = () => {
        dispatch({ type: "RESTART", payload: { cardName: cardValue, numberOfPlayers: numberValue } })
        setShow(false)
    }

    return (
        <Modal show={show} setShow={setShow}>
            <div>
                <ModalHeader setShow={setShow} className="text-amber-700">New Game</ModalHeader>
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
                <div className="text-end mt-6">
                    <Button
                        className="bg-amber-700 text-white border-amber-800"
                        onClick={handleStart}
                    >
                        <FontAwesomeIcon icon={faPlay} /> Start Game
                    </Button>
                </div>
            </div>
        </Modal>
    )
}