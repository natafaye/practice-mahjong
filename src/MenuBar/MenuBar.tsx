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
    const { rackLight, rackMid, rackDark, rackVeryDark } = useTheme()
    const buttonColors = { light: rackLight, mid: rackMid, dark: rackVeryDark }

    return (
        <div className="relative p-2 -mt-2 flex justify-between items-center text-white" style={{ background: rackDark }}>
            <div className="flex flex-nowrap">
                <Button
                    onClick={() => dispatch({ type: "UNDO" })}
                    colors={buttonColors}
                >
                    <FontAwesomeIcon icon={faUndo} /> Undo
                </Button>
                <Button
                    onClick={() => dispatch({ type: "REDO" })}
                    colors={buttonColors}
                >
                    <FontAwesomeIcon icon={faRedo} /> Redo
                </Button>
            </div>
            <HintText />
            <div className="flex flex-nowrap">
                <Button
                    onClick={() => setShowNewGameModal(true)}
                    colors={buttonColors}
                >
                    <FontAwesomeIcon icon={faPlus} /> New Game
                </Button>
                <Button
                    onClick={() => setShowThemeModal(true)}
                    colors={buttonColors}
                >
                    <FontAwesomeIcon icon={faPalette} /> Themes
                </Button>
            </div>
            <ThemeModal show={showThemeModal} setShow={setShowThemeModal} />
            <NewGameModal show={showNewGameModal} setShow={setShowNewGameModal} />
        </div>
    )
}