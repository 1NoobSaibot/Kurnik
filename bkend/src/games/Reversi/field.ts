import IField from "src/interfaces/IField"
import { ReversiState, ReversiCell } from "./state";

/**
 * Класс поле хранит текущее состояние доски
 * А также правило преобразования в определитель
 * 
 * !WARNING
 * Полю обязано глубоко клонировать состояние
 */
export default class ReversiField implements IField {
	private readonly _m: ReversiCell[][]
	public readonly currentPlayer: ReversiCell


	constructor({ m, currentPlayer }: ReversiState) {
		this.currentPlayer = currentPlayer
		this._m = new Array<ReversiCell[]>(m.length)
		for (let i = 0; i < m.length; i++) {
			this._m[i] = new Array<ReversiCell>(m[i].length)
			for (let j = 0; j < m[i].length; j++) {
				this._m[i][j] = m[i][j]
			}
		}
	}

	public getValue(x: number, y: number): ReversiCell {
		return this._m[x][y]
	}

	public getDeterminant(): BigInt {
		throw new Error('Not Implemented')
	}
}