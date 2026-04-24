import { ActionCreators } from 'redux-undo';
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPalette, faPlus, faRedo, faUndo } from "@fortawesome/free-solid-svg-icons"
import ThemeModal from "./ThemeModal"
import Button from "../Button"
import { useTheme } from "../useTheme"
import NewGameModal from "./NewGameModal"
import HintText from "./HintText"
import { useDispatch, useSelector } from "react-redux"
import { selectCanRedo, selectCanUndo } from "../_store/selectors"

export default function MenuBar() {
    const [showThemeModal, setShowThemeModal] = useState(false)
    const [showNewGameModal, setShowNewGameModal] = useState(false)
    const canUndo = useSelector(selectCanUndo)
    const canRedo = useSelector(selectCanRedo)
    const dispatch = useDispatch()
    const { rackLight, rackMid, rackDark, rackVeryDark } = useTheme()
    const buttonColors = { light: rackLight, mid: rackMid, dark: rackVeryDark }

    return (
        <div className="relative p-2 pb-3 -mt-2 flex justify-between items-center text-white" style={{ background: rackDark }}>
            <div className="flex flex-nowrap gap-1">
                <Button
                    onClick={() => dispatch(ActionCreators.undo())}
                    colors={buttonColors}
                    disabled={!canUndo}
                >
                    <FontAwesomeIcon icon={faUndo} /> Undo
                </Button>
                <Button
                    onClick={() => dispatch(ActionCreators.redo())}
                    colors={buttonColors}
                    disabled={!canRedo}
                >
                    <FontAwesomeIcon icon={faRedo} /> Redo
                </Button>
            </div>
            <HintText />
            <div className="flex flex-nowrap gap-1">
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