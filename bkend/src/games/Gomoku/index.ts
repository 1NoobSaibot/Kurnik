import { Player } from 'src/interfaces/player';
import { Game, State } from '../../interfaces/game'
import { Board, Cell } from './board'

const WHITE_PLAYER_INDEX = 0
const BLACK_PLAYER_INDEX = 1

export class Gomoku extends Game {
	private _board: Board = new Board()
	readonly id: number;


	constructor(id: number, white: Player, black: Player) {
		super(id)
		this._players[WHITE_PLAYER_INDEX] = white;
		this._players[BLACK_PLAYER_INDEX] = black;

	}

	get currentPlayer(): Player {
		return this._board.currentPlayer === Cell.White
			? this._players[WHITE_PLAYER_INDEX]
			: this._players[BLACK_PLAYER_INDEX]
	}

	getSides() {
		return [
			{ index: 0, sideName: 'White' },
			{ index: 1, sideName: 'Black' }
		]
	}
}