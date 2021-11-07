import IField from "src/games/IField"

export class HistoryNode<F extends IField, Move extends Object> {
	readonly field: F
	readonly move: Move
	readonly playerIndex: number

	constructor(field: F, move: Move, playerIndex: number) {
		this.field = field
		this.move = move
		this.playerIndex = playerIndex
	}
}

export class History<F extends IField, Move> {
	private _stack: HistoryNode<F, Move>[] = []

	public push(field: F, move: Move, playerIndex: number) {
		this._stack.push(new HistoryNode(field, move, playerIndex))
	}

	public getMovesByPlayer(playerIndex: number): HistoryNode<F, Move>[] {
		return this._stack
			.filter(node => node.playerIndex === playerIndex)
	}

	public getFields(): F[] {
		const res : F[] = []
		for (let i = 0; i < this._stack.length; i++) {
			res.push(this._stack[i].field)
		}
		return res
	}
}