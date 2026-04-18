import { CARDS } from "../../_data/CARDS";
import { generateInitialData } from "../generate";

type Payload = {
    cardName: string;
    numberOfPlayers: number;
}

export const restartGame = ({ cardName, numberOfPlayers }: Payload) => {
    const card = CARDS.find((card) => card.name === cardName)!;
    return generateInitialData(numberOfPlayers, card);
}