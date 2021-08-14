import IField from "src/interfaces/IField"

export class HistoryNode<F extends IField, Move> {
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
}