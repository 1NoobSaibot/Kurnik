import ReversiBoard from "src/games/Reversi/reversi-board"
import ReversiMove from "src/games/Reversi/reversi-move"
import { ReversiState } from "./reversi-state"
import { ReversiCell } from "./dtos/reversi-game.dto"

/**
 * Класс поле хранит текущее состояние доски
 * А также правило преобразования в определитель
 * 
 * !WARNING
 * Поле обязано глубоко клонировать состояние
 */
export default class ReversiField {
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

	public getValue (x: number, y: number): ReversiCell {
		return this.m[x][y]
	}

	public getDeterminant (): BigInt {
		throw new Error('Not Implemented')
	}

	public getMoves (): ReversiMove[] {
		return ReversiBoard.findMoves(this.m, this.currentPlayer)
	}
}