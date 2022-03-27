import { GameState } from "./game"

export interface GameData<BoardState> {
	state: GameState
	board?: BoardState
	currentPlayer?: number
	history?: BoardState[]
}
