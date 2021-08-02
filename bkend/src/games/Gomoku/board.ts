import { IBoard, Score, SideInfo } from "src/interfaces/IBoard"
import Field from "./field"
import { Cell, State } from "./state"

export class MoveArg {
	readonly x: number
	readonly y: number
}

export class Board implements IBoard {
	private _state: State
	private _winner: Cell = Cell.Empty
	private _isGameOver: boolean = false

	get winner(): Cell {
		return this._winner
	}

	isGameOver(): boolean {
		return this._isGameOver
	}

	getCurrentPlayer() {
		return this._state.currentPlayer
	}

	getAmountOfPlayers() {
		return 2
	}


	constructor() {
		const m = new Array(19)
		for (let i = 0; i < m.length; i++) {
			m[i] = new Array(19)
			for (let j = 0; j < 19; j++) {
				m[i][j] = Cell.Empty
			}
		}

		const state = new State()
		state.currentPlayer = Cell.White
		state.m = m
		this._state = state
	}

	public move({ x, y }: MoveArg): boolean {
		if (this.isGameOver() || this._state.m[x][y] !== Cell.Empty)
			return false

		this._state.m[x][y] = this._state.currentPlayer
		if (this._checkForWin(x, y)) {
			this._winner = this._state.currentPlayer
			this._isGameOver = true
		} else if (this._checkForEndOfGame()) {
			this._isGameOver = true
		} else {
			this._swapPlayer()
		}
	}

	public getScore(playerIndex: number): Score {
		if (!this.isGameOver())
			throw new Error('Trying to get score before the game is over')
		
		if (this._winner === Cell.Empty)
			return Score.Draw
		
		if (this._winner === this._playerIndex2Cell(playerIndex))
			return Score.Winner
		return Score.Looser
	}

	public getField() {
		return new Field(this._state)
	}

	public getSides(): SideInfo[] {
		return [
			{ index: 0, name: 'White' },
			{ index: 1, name: 'Black' }
		]
	}

	/**
	 * returns true if current player got win
	 * @param x 
	 * @param y 
	 * @returns 
	 */
	private _checkForWin(x: number, y: number): boolean {
		const dirs = [
			{ dx: 0, dy: 1 },
			{ dx: 1, dy: 1 },
			{ dx: 1, dy: 0 },
			{ dx: 1, dy: -1 },
			{ dx: 0, dy: -1 },
			{ dx: -1, dy: -1 },
			{ dx: -1, dy: 0 },
			{ dx: -1, dy: 1 }
		]

		const m = this._state.m
		const player = m[x][y]

		for (let i = 0; i < dirs.length; i++) {
			const { dx, dy } = dirs[i]
			if (_checkLine(dx, dy))
				return true
		}

		return false

		function _checkLine(dx, dy): boolean {
			for (let j = 0; j < 5; j++) {
				try {
					if (m[x + dx * j][y + dy * j] !== player)
						return false
				} catch (e) {
					if (e instanceof TypeError)
						return false
				}
			}

			return true
		}
	}

	/**
	 * Returns true if the board has no empty cells
	 * @returns is board full
	 */
	private _checkForEndOfGame(): boolean {
		for (let i = 0; i < 19; i++) {
			for (let j = 0; j < 19; j++) {
				if (this._state.m[i][j] === Cell.Empty)
					return false
			}
		}

		return true
	}

	private _swapPlayer(): void {
		this._state.currentPlayer = this._state.currentPlayer === Cell.White
			? Cell.Black
			: Cell.White
	}

	private _playerIndex2Cell (index: number) {
		if (index === 0) return Cell.White
		if (index === 1) return Cell.Black
		throw new Error(`Unexpected index (${index}): cannot convert playerIndex to boardSide`)
	}
}
