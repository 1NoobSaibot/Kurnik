import { GomokuState, GomokuCell } from "./gomoku-state";

/**
 * Класс поле хранит текущее состояние доски
 * А также правило преобразования в определитель
 * 
 * !WARNING
 * Поле обязано глубоко клонировать состояние
 */
export default class GomokuField {
	private readonly _m: GomokuCell[][]
	public readonly currentPlayer: GomokuCell


	constructor({ m, currentPlayer }: GomokuState) {
		this.currentPlayer = currentPlayer
		this._m = new Array<GomokuCell[]>(m.length)
		for (let i = 0; i < m.length; i++) {
			this._m[i] = new Array<GomokuCell>(m[i].length)
			for (let j = 0; j < m[i].length; j++) {
				this._m[i][j] = m[i][j]
			}
		}
	}

	public getValue(x: number, y: number): GomokuCell {
		return this._m[x][y]
	}

	public getDeterminant(): BigInt {
		throw new Error('Not Implemented')
	}
}