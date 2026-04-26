import { generateInitialData } from "../generate/generateInitialData";

type Payload = {
    cardName: string;
    numberOfPlayers: number;
}

export const restartGame = ({ cardName, numberOfPlayers }: Payload) => {
    return generateInitialData({ numberOfPlayers, cardName });
}