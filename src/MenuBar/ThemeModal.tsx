import { useState } from "react"
import ThemePicker from "./ThemePicker"
import ThemePreview from "./ThemePreview"
import { Modal, ModalHeader } from "../Modal"
import Button from "../Button"
import { useTheme, THEMES } from "../useTheme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"

type Props = {
    show: boolean
    setShow: (show: boolean) => void
}

export default function ThemeModal({ show, setShow }: Props) {
    const { themeName, setTheme } = useTheme()
    const [themeValue, setThemeValue] = useState(themeName)

    const handleSave = () => {
        setTheme(THEMES.find(theme => theme.themeName === themeValue)!)
        setShow(false)
    }

    return (
        <Modal show={show} setShow={setShow}>
            <ModalHeader setShow={setShow}>Theme</ModalHeader>
            <div className="mb-6 -mt-2">
                <ThemePicker value={themeValue} onChange={setThemeValue} />
            </div>
            <ThemePreview theme={THEMES.find(theme => theme.themeName === themeValue)!} />
            <div className="flex justify-end gap-3 mt-6">
                <Button className="bg-gray-100 border-gray-300" onClick={handleSave}>
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-800"/> Save
                </Button>
            </div>
        </Modal>
    )
}