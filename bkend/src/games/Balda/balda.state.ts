export class BaldaState {
	public readonly cells: string[][]
	public players: PlayerState[]
}

export class PlayerState {
	words: string[]
	skipped: boolean
}
