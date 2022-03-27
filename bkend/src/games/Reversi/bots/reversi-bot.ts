import { Point } from "../../../games/common/point"
import { Bot } from "../../Player"
import ReversiBoard from "../reversi-board"
import { ReversiState } from "../reversi-state"


export default abstract class ReversiBot extends Bot<ReversiBoard, Point, ReversiState> {
	protected _findAllPossibleMoves (board: ReversiBoard): Point[] {
		const moves: Point[] = []

		for (let x = 0; x < 8; x++) {
			for (let y = 0; y < 8; y++) {
				const position = new Point(x, y)
				if (board.canMove(position)) {
					moves.push(position)
				}
			}
		}

		return moves
	}
}