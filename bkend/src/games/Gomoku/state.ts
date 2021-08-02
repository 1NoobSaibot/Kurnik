export enum Cell {
	Empty,
	White,
	Black
}

export class State {
	m: Cell[][]
	currentPlayer: Cell
}