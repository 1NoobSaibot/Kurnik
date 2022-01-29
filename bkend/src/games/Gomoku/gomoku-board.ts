import { IBoard, SideInfo } from "src/games/IBoard"
import GomokuField from "./gomoku-field"
import GomokuMove from "./gomoku-move"
import { GomokuCell, GomokuState } from "./gomoku-state"
import { Score } from "../common"

const FIELD_WEIGHT = 19

export class GomokuBoard implements IBoard<GomokuMove, GomokuField> {
	private _state: GomokuState
	private _winner: GomokuCell = GomokuCell.Empty
	private _isGameOver: boolean = false

	get winner(): GomokuCell {
		if (!this._isGameOver)
			throw new Error("Trying to get winner before game is over")
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
		const m = new Array(FIELD_WEIGHT)
		for (let i = 0; i < m.length; i++) {
			m[i] = new Array(FIELD_WEIGHT)
			for (let j = 0; j < FIELD_WEIGHT; j++) {
				m[i][j] = GomokuCell.Empty
			}
		}

		const state = new GomokuState()
		state.currentPlayer = GomokuCell.White
		state.m = m
		this._state = state
	}

	public move({ x, y }: GomokuMove): boolean {
		if (this.isGameOver() || this._state.m[x][y] !== GomokuCell.Empty)
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
		
		if (this._winner === GomokuCell.Empty)
			return Score.Draw
		
		if (this._winner === this._playerIndex2Cell(playerIndex))
			return Score.Winner
		return Score.Looser
	}

	public getField() {
		return new GomokuField(this._state)
	}

	public getMoves() {
		const moves: GomokuMove[] = []
		const currentPlayer = this._state.currentPlayer

		for (let x = 0; x < FIELD_WEIGHT; x++) {
			for (let y = 0; y < FIELD_WEIGHT; y++) {
				if (this._state.m[x][y] == GomokuCell.Empty)
					moves.push({ x, y })
			}
		}

		return moves
	}

	public getSides(): SideInfo[] {
		return [
			{ index: 0, name: 'White' },
			{ index: 1, name: 'Black' }
		]
	}
	
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
		for (let i = 0; i < FIELD_WEIGHT; i++) {
			for (let j = 0; j < FIELD_WEIGHT; j++) {
				if (this._state.m[i][j] === GomokuCell.Empty)
					return false
			}
		}

		return true
	}

	private _swapPlayer(): void {
		this._state.currentPlayer = this._state.currentPlayer === GomokuCell.White
			? GomokuCell.Black
			: GomokuCell.White
	}

	private _playerIndex2Cell (index: number) {
		if (index === 0) return GomokuCell.White
		if (index === 1) return GomokuCell.Black
		throw new Error(`Unexpected index (${index}): cannot convert playerIndex to boardSide`)
	}
}