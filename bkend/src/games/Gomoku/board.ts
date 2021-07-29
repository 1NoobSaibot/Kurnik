export enum Cell {
	Empty,
	White,
	Black
}

export class Board {
	private _m: Cell[][]
	private _winner: Cell = Cell.Empty
	private _currentPlayer = Cell.White

	get winner(): Cell {
		return this._winner
	}

	get isOver(): boolean {
		return this._winner != Cell.Empty
	}

	get currentPlayer(): Cell {
		return this._currentPlayer
	}


	constructor() {
		const m = new Array(19)
		for (let i = 0; i < m.length; i++) {
			m[i] = new Array(19)
			for (let j = 0; j < 19; j++) {
				m[i][j] = Cell.Empty
			}
		}
		this._m = m
	}

	public move(x: number, y: number): boolean {
		if (this.isOver || this._m[x][y] !== Cell.Empty)
			return false

		this._m[x][y] = this._currentPlayer
		if (this._checkForEndOfGame(x, y))
			this._winner = this._currentPlayer
		else
			this._swapPlayer()
	}

	private _checkForEndOfGame(x: number, y: number): boolean {
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

		const m = this._m
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

	private _swapPlayer(): void {
		this._currentPlayer = this._currentPlayer === Cell.White
			? Cell.Black
			: Cell.White
	}
}
