import { Bot } from 'src/games/Player'
import { Game } from '../game'
import ReversiBoard from './reversi-board'
import ReversiRandomBot from './bots/randomBot'
import { ReversiCell } from './reversi-state'
import { ReversiState } from './reversi-state'
import { Point } from '../common/point'

export default class ReversiGame extends Game<ReversiBoard, Point, ReversiState> {
	public get name () {
		return 'Reversi'
	}

	protected _createBoard (): ReversiBoard {
		return new ReversiBoard()
	}

	protected _getAmountOfPlayers () {
		return 2
	}

	protected _getCurrentPlayerIndex () {
		const board = this.board
		const currentSide = board.currentSide
		if (currentSide == ReversiCell.White) {
			return 0
		}
		if (currentSide == ReversiCell.Black) {
			return 1
		}
		throw new Error(`It cannot be a player`)
	}

	protected _createBot (complexity: number): Bot<ReversiBoard, Point, ReversiState> {
		if (complexity === 0)
			return new ReversiRandomBot()
		// TODO: Make a complexity bot
		return new ReversiRandomBot()
	}
}
