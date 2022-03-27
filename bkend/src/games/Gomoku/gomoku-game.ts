import { NotImplementedException } from '@nestjs/common';
import { Game } from 'src/games/game'
import { Point } from '../common/point';
import { Bot } from '../Player';
import { GomokuBoard } from './gomoku-board'
import GomokuRandomBot from './gomoku-random-bot';
import { GomokuCell, GomokuState } from './gomoku-state';

export class Gomoku extends Game<GomokuBoard, Point, GomokuState> {
	public get name () {
		return 'Gomoku'
	}

	// TODO: Make complexity bot
	protected _createBot (complexity: number): Bot<GomokuBoard, Point, GomokuState> {
		return new GomokuRandomBot()
	}



	protected _createBoard (): GomokuBoard {
		return new GomokuBoard()
	}

	protected _getAmountOfPlayers(): number {
		return 2
	}

	protected _getCurrentPlayerIndex(): number {
		const cell: GomokuCell = this.board.getCurrentSide()
		if (cell == GomokuCell.White) {
			return 0
		}
		if (cell == GomokuCell.Black) {
			return 1
		}
		throw new Error(`Unexpected Gomoku Cell (${cell})`)
	}
}