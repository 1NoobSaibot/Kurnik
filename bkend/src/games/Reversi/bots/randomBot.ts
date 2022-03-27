import { Point } from "../../../games/common/point"
import ReversiBoard from "../reversi-board"
import ReversiBot from "./reversi-bot"

export default class ReversiRandomBot extends ReversiBot {
	async move (board: ReversiBoard) {
		const possibleMoves = this._findAllPossibleMoves(board)
		const moveArgs = this._chooseRandomMoveFrom(possibleMoves)
		board.move(moveArgs)
	}

	private _chooseRandomMoveFrom (moves: Point[]) {
		let index = Math.round(Math.random() * moves.length)
		index = index >= moves.length ? 0 : index
		return moves[index]
	}
}
