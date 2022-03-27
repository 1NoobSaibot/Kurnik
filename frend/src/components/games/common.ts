export enum GameState {
	Created,
	Started,
	Ended
}

export interface GameData<BoardState> {
	state: GameState
	board?: BoardState
	currentPlayer?: number
	history?: BoardState[]
}
