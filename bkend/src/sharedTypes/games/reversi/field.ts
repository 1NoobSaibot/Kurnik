import IField from "src/interfaces/IField"
import { ReversiState } from "../../../games/Reversi/state"
import { ReversiCell } from "./GameData"

/**
 * Класс поле хранит текущее состояние доски
 * А также правило преобразования в определитель
 * 
 * !WARNING
 * Полю обязано глубоко клонировать состояние
 */
export default class ReversiField implements IField {
	public readonly m: ReversiCell[][]
	public readonly currentPlayer: ReversiCell


	constructor({ m, currentPlayer }: ReversiState) {
		this.currentPlayer = currentPlayer
		this.m = new Array<ReversiCell[]>(m.length)
		for (let i = 0; i < m.length; i++) {
			this.m[i] = new Array<ReversiCell>(m[i].length)
			for (let j = 0; j < m[i].length; j++) {
				this.m[i][j] = m[i][j]
			}
		}
	}

	public getValue(x: number, y: number): ReversiCell {
		return this.m[x][y]
	}

	public getDeterminant(): BigInt {
		throw new Error('Not Implemented')
	}
}