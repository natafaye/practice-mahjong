import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPalette, faPlus, faRedo, faUndo } from "@fortawesome/free-solid-svg-icons"
import ThemeModal from "./ThemeModal"
import Button from "../Button"
import { useTheme } from "../useTheme"
import NewGameModal from "./NewGameModal"

export default function MenuBar() {
    const [showThemeModal, setShowThemeModal] = useState(false)
    const [showNewGameModal, setShowNewGameModal] = useState(false)
    const { rackDark, rackLight, rackMid } = useTheme()

    return (
        <div className="relative p-2 -mt-2 flex justify-between text-white" style={{ background: rackDark }}>
            <div>
                <Button style={{ background: rackLight, borderColor: rackMid }}>
                    <FontAwesomeIcon icon={faUndo}/> Undo
                </Button>
                <Button style={{ background: rackLight, borderColor: rackMid }}>
                    <FontAwesomeIcon icon={faRedo}/> Redo
                </Button>
                <Button onClick={() => setShowNewGameModal(true)} style={{ background: rackLight, borderColor: rackMid }}>
                    <FontAwesomeIcon icon={faPlus}/> New Game
                </Button>
            </div>
            <div>
                <Button onClick={() => setShowThemeModal(true)} style={{ background: rackLight, borderColor: rackMid }}>
                    <FontAwesomeIcon icon={faPalette}/> Themes
                </Button>
            </div>
            <ThemeModal show={showThemeModal} setShow={setShowThemeModal}/>
            <NewGameModal show={showNewGameModal} setShow={setShowNewGameModal}/>
        </div>
    )
}