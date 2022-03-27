import { Score } from "../common/score"
import { Board } from "../IBoard"
import { BaldaState, PlayerState } from "./balda.state"
import { BaldaMove } from "./balda.move"
import { BaldaService } from "./balda.service"
import { Point } from "../common/point"

export class BaldaBoard extends Board<BaldaMove, BaldaState> {
	private _m: (string|null)[][]
	private _currentPlayer: number = 0
	private _players: PlayerState[]
	private readonly _service: BaldaService
	private readonly _lang: string

	public get size () {
		return this._m.length
	}

	constructor (service: BaldaService, lang: string, size: number) {
		super()
		this._service = service
		this._lang = lang
		if (size != 5 && size != 7) {
			throw new Error('Wrong size')
		}

		this._m = new Array(size)
		for (let i = 0; i < size; i++) {
			this._m[i] = new Array(size)
			for (let j = 0; j < size; j++) {
				this._m[i][j] = null
			}
		}

		const word = service.getRandomWord(lang, size)
		const center = Math.trunc(size / 2)
		for (let i = 0; i < size; i++) {
			this._m[i][center] = word.charAt(i)
		}

		this._players = new Array(2)
		for (let i = 0; i < this._players.length; i++) {
			this._players[i] = {
				words: [],
				skipped: false
			}
		}
	}

	public canMove (args: BaldaMove): boolean {
		if (args.skip) {
			return true
		}
		return this._isPositionEmpty(args.point)
			&& this._isValidChar(args.char)
			&& this._isChainIncludeNewCharPosition(args)
			&& this._isValidChain(args)
			&& this._isWordExisting(args)
	}

	protected _move (args: BaldaMove) {
		if (args.skip) {
			this._players[this._currentPlayer].skipped = true
			return
		}

		const { char, chain, point } = args
		this._m[point.x][point.y] = char
		const word = this._makeWord(args)
		this._players[this._currentPlayer].words.push(word)
			
		this._changePlayersTurn()
	}

	private _isPositionEmpty (position: Point): boolean {
		return this._m[position.x][position.y] == null
	}

	private _isValidChar (char: string): boolean {
		return this._service.isValidChar(char, this._lang)
	}

	private _isChainIncludeNewCharPosition ({ point, chain }: BaldaMove): boolean {
		for (let i = 0; i < chain.length; i++) {
			if (point.isEqualTo(chain[i])) {
				return true
			}
		}
		return false
	}

	private _isValidChain ({ chain }: BaldaMove): boolean {
		return this._areAllPointsInsideTheBoard(chain)
			&& this._isItValidCurve(chain)
	}

	private _areAllPointsInsideTheBoard (points: Point[]): boolean {
		for (let i = 0; i < points.length; i++) {
			if (!this._isPointInsideTheBorderOfBoard(points[i])) {
				return false
			}
		}

		return true
	}

	private _isPointInsideTheBorderOfBoard (point: Point): boolean {
		const size = this.size
		return point.x >= 0 && point.x < size && point.y >= 0 && point.y < size
	}

	private _isItValidCurve (points: Point[]): boolean {
		for (let i = 1; i < points.length; i++) {
			if (!this._isValidLine(points[i-1], points[i])) {
				return false
			}

			// Every poind of chain should be used only once
			for (let j = 0; j < i; j++) {
				if (points[j].isEqualTo(points[i])) {
					return false
				}
			}
		}

		return true
	}

	private _isValidLine (pointA: Point, pointB: Point): boolean {
		const c = pointA.sub(pointB)
		return Math.abs(c.x) + Math.abs(c.y) == 1
	}

	private _isWordExisting (args: BaldaMove): boolean {
		const word = this._makeWord(args)
		return this._service.isWord(word, this._lang)
	}

	protected _checkIsGameOver (): boolean {
		return this._areAllPlayersSkipped()
			|| this._isBoardFull()
	}

	private _changePlayersTurn () {
		this._currentPlayer++
		if (this._currentPlayer >= this._players.length) {
			this._currentPlayer = 0
		}
	}

	private _makeWord ({ char: charFromUser, chain, point }: BaldaMove): string {
		let word = ''
		for (let i = 0; i < chain.length; i++) {
			if (chain[i].isEqualTo(point)) {
				word += charFromUser
				continue
			}

			const charFromBoard = this._m[chain[i].x][chain[i].y]
			word += charFromBoard
		}

		return word
	}

	private _areAllPlayersSkipped (): boolean {
		for (let i = 0; i < this._players.length; i++) {
			if (!this._players[i].skipped) {
				return false
			}
		}

		return true
	}

	private _isBoardFull (): boolean {
		for (let i = 0; i < this._m.length; i++) {
			for (let j = 0; j < this._m[i].length; j++) {
				if (this._m[i][j] == null) {
					return false
				}
			}
		}

		return true
	}

	getCurrentPlayer (): number {
		return this._currentPlayer
	}

	getScore (player: number): Score {
		let sum = 0
		const words = this._players[player].words
		for (let i = 0; i < words.length; i++) {
			sum += words[i].length
		}
		return sum
	}

	getAmountOfPlayers (): number {
		return 2
	}

	// TODO: Save only differences between states
	public getCopyOfState (): BaldaState {
		return {
			cells: this._m.map(row => row.map(char => char)),
			players: this._players.map(playerInfo => ({
				words: playerInfo.words.map(word => word),
				skipped: playerInfo.skipped
			}))
		}
	}
}
