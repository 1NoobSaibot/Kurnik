export class HistoryPair<BoardState, MoveArgs> {
	readonly field: BoardState
	readonly move: MoveArgs

	constructor (field: BoardState, move: MoveArgs) {
		this.field = field
		this.move = move
	}
}

export class History<BoardState, MoveArgs> {
	public readonly _pairs: HistoryPair<BoardState, MoveArgs>[] = []

	public push (field: BoardState, move: MoveArgs) {
		this._pairs.push(new HistoryPair(field, move))
	}

	public getFields(): BoardState[] {
		return this._pairs.map(pair => pair.field)
	}
}