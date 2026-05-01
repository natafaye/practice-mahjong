import { useEffect, useState } from "react"
import { ActionCreators } from 'redux-undo';
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartBar, faPalette, faPlus, faRedo, faUndo } from "@fortawesome/free-solid-svg-icons"
import ThemeModal from "./ThemeModal"
import GameOverModal from './GameOverModal/GameOverModal';
import NewGameModal from "./NewGameModal"
import HintText from "./HintText"
import Button from "../Button"
import { selectCanRedo, selectCanUndo, selectGameState } from "../_store/selectors"
import { useTheme } from "../useTheme"
import { GAME_OVER } from '../constants';
import StatsModal from "./StatsModal";

export default function MenuBar() {
  const gameState = useSelector(selectGameState)
  const [showThemeModal, setShowThemeModal] = useState(false)
  const [showNewGameModal, setShowNewGameModal] = useState(false)
  const [showGameOverModal, setShowGameOverModal] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const canUndo = useSelector(selectCanUndo)
  const canRedo = useSelector(selectCanRedo)
  const dispatch = useDispatch()
  const { rackLight, rackMid, rackDark, rackVeryDark } = useTheme()
  const buttonColors = { light: rackLight, mid: rackMid, dark: rackVeryDark }

  useEffect(function showModalOnGameOver() {
    if(gameState === GAME_OVER) {
      setShowGameOverModal(true)
    }
  }, [gameState])

  return (
    <div className="relative p-1 pb-2 flex justify-between items-center text-white" style={{ background: rackDark }}>
      <div className="flex flex-nowrap gap-1">
        <Button
          onClick={() => dispatch(ActionCreators.undo())}
          colors={buttonColors}
          disabled={!canUndo}
        >
          <FontAwesomeIcon icon={faUndo} />
        </Button>
        <Button
          onClick={() => dispatch(ActionCreators.redo())}
          colors={buttonColors}
          disabled={!canRedo}
        >
          <FontAwesomeIcon icon={faRedo} />
        </Button>
      </div>
      <HintText />
      <div className="flex flex-nowrap gap-1">
        <Button
          onClick={() => setShowNewGameModal(true)}
          colors={buttonColors}
        >
          <FontAwesomeIcon icon={faPlus} /> New
        </Button>
        <Button
          onClick={() => setShowStatsModal(true)}
          colors={buttonColors}
        >
          <FontAwesomeIcon icon={faChartBar} />
        </Button>
        <Button
          onClick={() => setShowThemeModal(true)}
          colors={buttonColors}
        >
          <FontAwesomeIcon icon={faPalette} />
        </Button>
      </div>
      <ThemeModal show={showThemeModal} setShow={setShowThemeModal} />
      <StatsModal show={showStatsModal} setShow={setShowStatsModal} />
      <NewGameModal show={showNewGameModal} setShow={setShowNewGameModal} />
      <GameOverModal show={showGameOverModal} setShow={setShowGameOverModal} startNewGame={() => setShowNewGameModal(true)} />
    </div>
  )
}