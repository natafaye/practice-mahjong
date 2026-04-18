import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPalette, faPlus, faRedo, faUndo } from "@fortawesome/free-solid-svg-icons"
import ThemeModal from "./ThemeModal"
import Button from "../Button"
import { useTheme } from "../useTheme"
import NewGameModal from "./NewGameModal"
import HintText from "./HintText"
import useMahjongData from "../useMahjongData"

export default function MenuBar() {
    const [showThemeModal, setShowThemeModal] = useState(false)
    const [showNewGameModal, setShowNewGameModal] = useState(false)
    const { dispatch } = useMahjongData()
    const { rackDark, rackLight, rackMid } = useTheme()

    return (
        <div className="relative p-2 -mt-2 flex justify-between items-center text-white" style={{ background: rackDark }}>
            <div className="flex flex-nowrap">
                <Button
                    onClick={() => dispatch({ type: "UNDO" })}
                    style={{ background: rackLight, borderColor: rackMid }}
                >
                    <FontAwesomeIcon icon={faUndo} /> Undo
                </Button>
                <Button
                    onClick={() => dispatch({ type: "REDO" })}
                    style={{ background: rackLight, borderColor: rackMid }}
                >
                    <FontAwesomeIcon icon={faRedo} /> Redo
                </Button>
            </div>
            <HintText />
            <div className="flex flex-nowrap">
                <Button
                    onClick={() => setShowNewGameModal(true)}
                    style={{ background: rackLight, borderColor: rackMid }}
                >
                    <FontAwesomeIcon icon={faPlus} /> New Game
                </Button>
                <Button
                    onClick={() => setShowThemeModal(true)}
                    style={{ background: rackLight, borderColor: rackMid }}
                >
                    <FontAwesomeIcon icon={faPalette} /> Themes
                </Button>
            </div>
            <ThemeModal show={showThemeModal} setShow={setShowThemeModal} />
            <NewGameModal show={showNewGameModal} setShow={setShowNewGameModal} />
        </div>
    )
}