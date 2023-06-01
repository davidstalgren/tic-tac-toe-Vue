import { Player } from "./Player";

export interface IStateOfTheGame {
    players: Player[],
    board: string[],
    playerTurn: string,
    gameStarted: boolean,
    winner: string | null
}