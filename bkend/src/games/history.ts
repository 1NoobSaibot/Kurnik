import IField from "src/interfaces/IField"

export class HistoryNode<TField extends IField, TMove> {
	readonly field: TField
	readonly move: TMove
	readonly playerIndex: number

	constructor(field: TField, move: TMove, playerIndex: number) {
		this.field = field
		this.move = move
		this.playerIndex = playerIndex
	}
}

export class History<TField extends IField, TMove> {
	private _stack: HistoryNode<TField, TMove>[] = []

	public push(field: TField, move: TMove, playerIndex: number) {
		this._stack.push(new HistoryNode(field, move, playerIndex))
	}

	public getMovesByPlayer(playerIndex: number): HistoryNode<TField, TMove>[] {
		return this._stack
			.filter(node => node.playerIndex === playerIndex)
	}
}