import { IBoard, Score, SideInfo } from 'src/interfaces/IBoard'
import { ReversiCell, ReversiState } from './state'
import ReversiMove from './move'
import ReversiField from './field'


export default class ReversiBoard implements IBoard {
	private _state: ReversiState
	private _winner: ReversiCell = ReversiCell.Empty
	private _isGameOver: boolean = false

	get winner(): ReversiCell {
		if (!this._isGameOver)
			throw new Error("Trying to get winner before game is over")
		return this._winner
	}

	public isGameOver(): boolean {
		return this._isGameOver
	}

	public getScore(playerIndex: number) : Score {
		if (!this.isGameOver())
			throw new Error('Trying to get score before the game is over')

		if (this._winner === ReversiCell.Empty)
			return Score.Draw
		
		if (this._winner === this._playerIndex2Cell(playerIndex))
			return Score.Winner
		return Score.Looser
	}
	
	public getAmountOfPlayers() : number {
		return 2
	}

	public getCurrentPlayer() : ReversiCell {
		return this._state.currentPlayer
	}

	constructor() {
		const m = new Array(8)
		for (let i = 0; i < m.length; i++) {
			m[i] = new Array(8)
			for (let j = 0; j < 8; j++) {
				m[i][j] = ReversiCell.Empty
			}
		}

		const state = new ReversiState()
		state.currentPlayer = ReversiCell.White
		state.m = m
		this._state = state
	}

	public move({ x, y }: ReversiMove) : boolean {
		if (this._isGameOver)
			return false

		if (!this._setCell(x, y))
			return false

		this._swapPlayer();
		if (!this._existMove(this._state.currentPlayer)) {
			this._swapPlayer();
			if (!this._existMove(this._state.currentPlayer)) {
				this._isGameOver = true
				this._winner = this._defineWinner()
			}
		}
		
		return true
	}

	public getField(): ReversiField {
		return new ReversiField(this._state)
	}

	public getSides(): SideInfo[] {
		return [
			{ index: 0, name: 'White' },
			{ index: 1, name: 'Black' }
		]
	}

	private _defineWinner() : ReversiCell {
		const m = this._state.m
		let blackCount = 0
		let whiteCount = 0
		
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (m[i][j] == ReversiCell.White)
					whiteCount++
				else if (m[i][j] == ReversiCell.Black) 
					blackCount++
			}
		}

		if (blackCount == whiteCount)
			return ReversiCell.Empty
		if (blackCount > whiteCount)
			return ReversiCell.Black
		return ReversiCell.White
	}

	private _playerIndex2Cell(index: number) {
		if (index == 0) return ReversiCell.White
		if (index == 1) return ReversiCell.Black
		throw new Error(`Unexpected index (${index}): cannot convert playerIndex to boardSide`)
	}

	private _setCell(x: number, y: number) {
		const currentPlayer = this._state.currentPlayer
		if (!this._canMove(x, y, currentPlayer))
			return false;
		const m = this._state.m
		
		m[x][y] = currentPlayer

		let res = false
		for (let a = -1; a < 2; a++) {
			for (let b = -1; b < 2; b++) {
				if (this._isLineValid(x, y, a, b, currentPlayer)) {
					_invertLine(a, b)
					res = true
				}
			}
		}

		return res

		function _invertLine(a: number, b: number) {
			for (
				let i = x + a, j = y + b;
				m[i][j] != currentPlayer;
				i += a, j += b
			) {
				m[i][j] = invert(m[i][j])
			}
		}
	}

	
	private _swapPlayer() {
		this._state.currentPlayer = invert(this._state.currentPlayer)
	}

	private _existMove(player: ReversiCell) : boolean {
		for (let x = 0; x < 8; x++) {
			for (let y = 0; y < 8; y++) {
				if (this._canMove(x, y, player))
					return true
			}
		}
		
		return false
	}

	private _canMove(x: number, y: number, player: ReversiCell) : boolean {
		const m = this._state.m

		if (m[x][y] !== ReversiCell.Empty)
			return false

		for (let a = -1; a < 2; a++) {
			for (let b = -1; b < 2; b++) {
				if (this._isLineValid(x, y, a, b, player))
					return true
			}
		}

		return false;
	}

	private _isLineValid(x: number, y: number, a: number, b: number, player: ReversiCell) : boolean {
		const m = this._state.m
		let ok = false
		
		for (let i = x + a, j = y + b; ; i += a, j += b) {
			if (i < 0 || j < 0 || i > 7 || j > 7 || m[i][j] == ReversiCell.Empty)
				return false
			if (m[i][j] == player)
				return ok
			if (m[i][j] == invert(player))
				ok = true
		}
	}
}

function invert(cell: ReversiCell) : ReversiCell {
	if (cell == ReversiCell.White)
		return ReversiCell.Black;
	if (cell == ReversiCell.Black)
		return ReversiCell.White;
	throw new Error('You don\'t have to invert an empty cell!');
}
