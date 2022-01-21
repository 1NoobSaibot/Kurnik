import IField from "../IField";

export class BaldaField implements IField {
	private _m: string[][]
	private _players: PlayerState[]

	constructor (m: string[][], players: PlayerState[]) {
		this._m = m
		this._players = players 
	}

	public getSize () {
		return this._m.length
	}

	public getChar (x: number, y: number): string {
		return this._m[x][y]
	}

	getDeterminant(): BigInt {
		throw new Error('This method is not implemented')
	}
}

export interface PlayerState {
	words: string[]
	skipped: boolean
}