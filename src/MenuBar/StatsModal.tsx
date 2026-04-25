import { useState } from "react"
import { CARDS } from "../_data/CARDS"
import { Modal, ModalHeader, ModalBody } from "../Modal"
import clsx from "clsx"
import { getWinStats } from "../_store/localStorage"
import { getHandsData } from "../_shared"
import CardSectionStats from "./CardSectionStats"
import { useSelector } from "react-redux"
import { selectSeed } from "../_store/selectors"

type Props = {
  show: boolean
  setShow: (show: boolean) => void
}

export default function StatsModal({ show, setShow }: Props) {
  const seed = useSelector(selectSeed)
  const [selectedCardName, setSelectedCardName] = useState(CARDS[0].name)
  const stats = getWinStats()
  const handsData = getHandsData(selectedCardName)
  return (
    <Modal show={show} setShow={setShow} size="lg">
      <ModalHeader setShow={setShow}>Win Stats</ModalHeader>
      <ModalBody>
        <div className="border-b-2 border-gray-300 ps-1">
          {CARDS.map(card => (
            <button
              key={card.name}
              onClick={() => setSelectedCardName(card.name)}
              className={clsx(
                card.name === selectedCardName ? "bg-gray-300 scale-105" : "bg-gray-200",
                "p-3 px-5 rounded-t-lg me-2"
              )}
            >
              {card.name}
            </button>
          ))}
        </div>
        <div className="mb-4 ms-1 me-2">
          {handsData.sections.map(section => (
            <CardSectionStats key={section} section={section} cardName={selectedCardName} stats={stats} />
          ))}
        </div>
        <p className="text-gray-300 font-light">Current Seed: { seed }</p>
      </ModalBody>
    </Modal>
  )
}