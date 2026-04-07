import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGripLines } from "@fortawesome/free-solid-svg-icons"

type Props = {
    
}

export default function Gap({}: Props) {
    return (
        <div className="text-white relative rounded-lg py-2 text-center">
            <FontAwesomeIcon icon={faGripLines} />
        </div>
    )
}
