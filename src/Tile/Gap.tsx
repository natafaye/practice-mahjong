import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGripLines } from "@fortawesome/free-solid-svg-icons"
import type { Size } from "../types"
import { tileSizes } from "./tileSizes"

type Props = {
    size: Size
}

export default function Gap({ size }: Props) {
    return (
        <div className="text-white relative rounded-lg py-2 text-center opacity-40">
            <FontAwesomeIcon icon={faGripLines} className={tileSizes[size].numberClassName} />
        </div>
    )
}
