export enum GomokuCell {
	Empty = 0,
	White = 1,
	Black = 2
}

export class GomokuState {
	cells: GomokuCell[][]
	currentSide: GomokuCell
}
