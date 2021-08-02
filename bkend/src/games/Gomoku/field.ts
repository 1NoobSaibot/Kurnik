import IField from "src/interfaces/IField"
import { State, Cell } from "./state";

/**
 * Класс поле хранит текущее состояние доски
 * А также правило преобразования в определитель
 * 
 * !WARNING
 * Поле обязано глубоко клонировать состояние
 */
export default class Field implements IField {
	private readonly _m: Cell[][]
	public readonly currentPlayer: Cell


	constructor({ m, currentPlayer }: State) {
		this.currentPlayer = currentPlayer
		this._m = new Array<Cell[]>(m.length)
		for (let i = 0; i < m.length; i++) {
			this._m[i] = new Array<Cell>(m[i].length)
			for (let j = 0; j < m[i].length; j++) {
				this._m[i][j] = m[i][j]
			}
		}
	}

	public getValue(x: number, y: number): Cell {
		return this._m[x][y]
	}

	public getDeterminant(): BigInt {
		throw new Error('Not Implemented')
	}
}