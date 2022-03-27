import { Board } from "src/games/IBoard"
import { GomokuCell, GomokuState } from "./gomoku-state"
import { Point } from "../common/point"

const FIELD_WEIGHT = 19

export class GomokuBoard extends Board<Point, GomokuState> {
	private _cells: GomokuCell[][]
	private _currentSide: GomokuCell = GomokuCell.White
	private _winner: GomokuCell = GomokuCell.Empty

	getCurrentSide () {
		return this._currentSide
	}

	constructor() {
		super()
		const cells = new Array(FIELD_WEIGHT)
		for (let i = 0; i < cells.length; i++) {
			cells[i] = new Array(FIELD_WEIGHT)
			for (let j = 0; j < FIELD_WEIGHT; j++) {
				cells[i][j] = GomokuCell.Empty
			}
		}
		this._cells = cells
	}

	public canMove (position: Point): boolean {
		return this._cells[position.x][position.y] == GomokuCell.Empty
	}

	protected _move ({ x, y }: Point) {
		this._cells[x][y] = this._currentSide
		if (this._checkForWin(x, y)) {
			this._winner = this._currentSide
			this._currentSide = GomokuCell.Empty
		} else if (this._checkIsBoardFull()) {
			this._currentSide = GomokuCell.Empty
		} else {
			this._swapPlayer()
		}
	}

	protected _checkIsGameOver(): boolean {
		return this._winner != GomokuCell.Empty || this._checkIsBoardFull()
	}

	public getCopyOfState(): GomokuState {
		return {
			cells: this._cells.map(row => row.map(cell => cell)),
			currentSide: this._currentSide
		}
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

		const m = this._cells
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
	protected _checkIsBoardFull(): boolean {
		for (let i = 0; i < FIELD_WEIGHT; i++) {
			for (let j = 0; j < FIELD_WEIGHT; j++) {
				if (this._cells[i][j] === GomokuCell.Empty)
					return false
			}
		}

		return true
	}

	private _swapPlayer(): void {
		this._currentSide = this._currentSide === GomokuCell.White
			? GomokuCell.Black
			: GomokuCell.White
	}
}
