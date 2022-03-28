import { Board } from '../board'
import { ReversiState } from './reversi-state'
import { ReversiCell } from './reversi-state'
import { Point } from '../common/point'

export default class ReversiBoard extends Board<Point, ReversiState> {
	private _cells: ReversiCell[][]
	private _currentSide: ReversiCell = ReversiCell.White

	public get currentSide (): ReversiCell {
		return this._currentSide
	}

	constructor() {
		super()
		this._initBoard()
	}

	private _initBoard () {
		let cells = new Array(8)
		for (let i = 0; i < cells.length; i++) {
			cells[i] = new Array(8)
		}

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				cells[i][j] = ReversiCell.Empty
			}
		}

		cells[3][3] = ReversiCell.White
		cells[3][4] = ReversiCell.Black
		cells[4][3] = ReversiCell.Black
		cells[4][4] = ReversiCell.White

		this._cells = cells
	}

	public canMove (position: Point): boolean {
		return this._canSideMove(position, this._currentSide)
	}

	protected _move (position: Point) {
		this._setCell(position)
		this._checkWhoIsNext()
	}

	public getCopyOfState(): ReversiState {
		return {
			cells: this._cells.map(row => row.map(cell => cell)),
			currentSide: this._currentSide
		}
	}

	protected _checkIsGameOver(): boolean {
		return this._currentSide == ReversiCell.Empty
	}

	private _checkWhoIsNext () {
		const oppositeSide = invert(this._currentSide)
		if (this._isThereMoveForSide(oppositeSide)) {
			this._currentSide = oppositeSide
		} else if (!this._isThereMoveForSide(this._currentSide)) {
			this._currentSide = ReversiCell.Empty
		}
	}

	private _setCell(position: Point) {
		this._cells[position.x][position.y] = this._currentSide

		let res = false
		for (let i = 0; i < DIRECTIONS.length; i++) {
			if (this._isLineValid(position, DIRECTIONS[i], this._currentSide)) {
				this._invertLine(position, DIRECTIONS[i])
				res = true
			}
		}

		return res
	}

	private _isThereMoveForSide (side: ReversiCell): boolean {
		for (let x = 0; x < 8; x++) {
			for (let y = 0; y < 8; y++) {
				const position = new Point(x, y)
				if (this._canSideMove(position, side)) {
					return true
				}
			}
		}

		return false
	}

	private _canSideMove (position: Point, side: ReversiCell): boolean {
		if (this.getCell(position) !== ReversiCell.Empty) {
			return false
		}

		for (let i = 0; i < DIRECTIONS.length; i++) {
			if (this._isLineValid(position, DIRECTIONS[i], side)) {
				return true
			}
		}

		return false
	}

	private _isLineValid (position: Point, direction: Point, side: ReversiCell) : boolean {
		const oppositeSide = invert(side)

		let isEnemyBetweenUs = false
		position = position.add(direction)
		while (this._isPointInsideBoard(position) && this.getCell(position) != ReversiCell.Empty) {
			if (this.getCell(position) == side) {
				return isEnemyBetweenUs
			}
			if (this.getCell(position) == oppositeSide) {
				isEnemyBetweenUs = true
			}
			position = position.add(direction)
		} 

		return false
	}

	private _invertLine (position: Point, direction: Point) {
		let cell = position.add(direction)
		do {
			this._cells[cell.x][cell.y] = invert(this._cells[cell.x][cell.y])
			cell = cell.add(direction)
		} while (this._cells[cell.x][cell.y] != this._currentSide)
	}

	public getCell (point: Point): ReversiCell {
		return this._cells[point.x][point.y]
	}

	private _isPointInsideBoard (point: Point): boolean {
		return point.x >= 0 && point.y >= 0 && point.x <= 7 && point.y <= 7
	}
}

function invert(cell: ReversiCell) : ReversiCell {
	if (cell == ReversiCell.White)
		return ReversiCell.Black;
	if (cell == ReversiCell.Black)
		return ReversiCell.White;
	throw new Error('Inverting an Empty-Cell detected. It is probably logic error');
}

const DIRECTIONS: Point[]  = [
	new Point( 0,  1),
	new Point( 1,  1),
	new Point( 1,  0),
	new Point( 1, -1),
	new Point( 0, -1),
	new Point(-1, -1),
	new Point(-1,  0),
	new Point(-1,  1)
]
