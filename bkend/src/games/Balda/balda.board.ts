import { Score } from "src/games/common";
import { IBoard, SideInfo } from "../IBoard";
import { BaldaField, PlayerState } from "./balda.field";
import { BaldaMove, Point } from "./balda.move";
import { BaldaService } from "./balda.service";

export class BaldaBoard implements IBoard<BaldaMove, BaldaField> {
	private _m: string[][]
	private _currentPlayer: number = 0
	private _players: PlayerState[]
	private readonly _service: BaldaService
	private readonly _lang: string
	private _isGameOver: boolean = false

	constructor (service: BaldaService, lang: string, size: number) {
		this._service = service
		this._lang = lang
		if (size != 5 && size != 7) {
			throw new Error('Wrong size')
		}

		this._m = new Array(size)
		for (let i = 0; i < size; i++) {
			this._m[i] = new Array(size)
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

	move (args: BaldaMove): boolean {
		if (this._isGameOver) {
			throw new Error('Game is over, dont move')
		}

		if (args.skip) {
			this._players[this._currentPlayer].skipped = true
			let isAllSkipped = true
			for (let i = 0; i < this._players.length; i++) {
				if (!this._players[i].skipped) {
					isAllSkipped = false
					break
				}
			}
			if (isAllSkipped) {
				this._isGameOver = true
				return true
			}
		} else {
			const char = args.char.toUpperCase()
			const { point, word } = args
			const { x, y } = point
			if (this._m[x][y]) {
				throw new Error('You can\'t put a letter inside this position')
			}
			if (!this._service.isValidChar(char, this._lang)) {
				throw new Error('You can\'t use the character with this language')
			}
			this._m[x][y] = char
			try {
				const wordStr = this._tryMove(word, x, y)
				this._players[this._currentPlayer].words.push(wordStr)
			} catch (e) {
				this._m[x][y] = undefined
				throw e
			}

			let isThereEmptyCell = false
			for (let i = 0; i < this._m.length; i++) {
				for (let j = 0; j < this._m[i].length; j++) {
					if (!this._m[i][j]) {
						isThereEmptyCell = true
						break
					}
				}
				if (isThereEmptyCell) {
					break
				}
			}

			if (!isThereEmptyCell) {
				this._isGameOver = true
			}
		}
		
		
		this._currentPlayer++
		if (this._currentPlayer >= this._players.length) {
			this._currentPlayer = 0
		}
		return true
	}

	private _tryMove (word: Point[], x: number, y: number): string {
		let str = ''
		let prevX = 0, prevY = 0
		let isNewCharIncluded = false
		for (let i = 0; i < word.length; i++) {
			const { x: _x, y: _y } = word[i]
			const _ch = this._m[_x][_y]
			if (!_ch) {
				throw new Error('You cannot build chain with empty cells')
			}
			str += _ch

			if (i > 0) {
				const isGoodLine = (Math.abs(prevX - _x) == 1 && prevY == _y) || (prevX == _x && Math.abs(prevY - _y) == 1)
				if (!isGoodLine) {
					throw new Error('The chain is uncorrect')
				}
				for (let j = 0; j < i; j++) {
					if (word[j].x == _x && word[j].y == y) {
						throw new Error('You cannot use the same cell twice. The chain is uncorrect')
					}
				}
			}

			prevX = _x
			prevY = _y

			if (_x == x && _y == y) {
				isNewCharIncluded = true
			}
		}

		if (!isNewCharIncluded) {
			throw new Error('You must use your the symbol which you added')
		}

		if (!this._service.isWord(str, this._lang)) {
			throw new Error(`The word ${str} was not found in our vocabulady.`)
		}
		for (let i = 0; i < this._players.length; i++) {
			const words = this._players[i].words
			for (let j = 0; j < words.length; j++) {
				if (words[j] == str) {
					throw new Error('You cannot use the same word twice in the game')
				}
			}
		}

		return str
	}

	getCurrentPlayer (): number {
		return this._currentPlayer
	}

	isGameOver (): boolean {
		return this._isGameOver
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

	getField(): BaldaField {
		return new BaldaField(this._m, this._players)
	}

	getMoves(): BaldaMove[] {
		throw new Error('This method is not implemented')
	}

	getSides(): SideInfo[] {
		return [
			{ index: 0, name: 'First Player' },
			{ index: 1, name: 'Second Player' },
		]
	}
}
