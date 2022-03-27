import { ReversiKnowledgeService } from '../reversi-knowledge.service'
import ReversiBoard from '../reversi-board'
import ReversiBot from './reversi-bot'
import { ReversiState } from '../reversi-state'
import { ReversiCell } from '../reversi-state'
import { Point } from '../../common/point'
import { FieldStatistic, Pair } from '../../common/field-statistic'


export default class ReversiCleverBot extends ReversiBot {
	private readonly _knowledgeService: ReversiKnowledgeService

	constructor (service: ReversiKnowledgeService) {
		super()
		this._knowledgeService = service
	}

	public move (board: ReversiBoard) {
		const boardState = board.getCopyOfState()
		const moves = this._findAllPossibleMoves(board)
		if (moves.length == 1) {
			board.move(moves[0])
			return
		}

		const theBestMove = this._chooseTheBestMove(moves, boardState)
		board.move(theBestMove)
	}

	private _chooseTheBestMove (moves: Point[], boardState: ReversiState): Point {
		const determinant = this._getDeterminant(boardState)
		const fieldStats = this._knowledgeService.getFieldStats(determinant)
		const pairs: Pair<Point>[] = this._getPairs(fieldStats, moves)
		const move = this._findTheBestMove(pairs)
		return move
	}

	private _getDeterminant (boardState: ReversiState): BigInt {
		const allyEnemyBoard = this._blackWhiteBoardToAllyEnemyBoard(boardState)
		return this._findDeterminant(allyEnemyBoard)
	}

	private _blackWhiteBoardToAllyEnemyBoard (boardState: ReversiState): AllyEnemyCell[][] {
		const { cells, currentSide } = boardState
		const allyEnemyBoard: AllyEnemyCell[][] = new Array(8)

		for (let i = 0; i < 8; i++) {
			allyEnemyBoard[i] = new Array(8)
			for (let j = 0; j < 8; j++) {
				allyEnemyBoard[i][j] = this._blackWhiteCellToAllyEnemyCell(cells[i][j], currentSide)
			}
		}

		return allyEnemyBoard
	}

	private _blackWhiteCellToAllyEnemyCell (bw: ReversiCell, currentSide: ReversiCell): AllyEnemyCell {
		return bw == ReversiCell.Empty
			? AllyEnemyCell.Empty
			: (bw == currentSide ? AllyEnemyCell.Ally : AllyEnemyCell.Enemy)
	}

	private _findDeterminant (field: number[][]): BigInt {
		let sum = 0n
		for (let x = 0; x < field.length; x++) {
			for (let y = 0; y < field.length; y++) {
				sum *= 3n
				sum += BigInt(field[x][y])
			}
		}
		return sum
	}

	private _getPairs (stats: FieldStatistic<Point>, moves: Point[]): Pair<Point>[] {
		const pairs: Pair<Point>[] = new Array(moves.length)

		for (let i = 0; i < moves.length; i++) {
			pairs[i] = stats.getPair(moves[i])
		}

		return pairs
	}

	private _findTheBestMove (pairs: Pair<Point>[]): Point {
		let maxPair = pairs[0]

		for (let i = 1; i < pairs.length; i++) {
			const pair = pairs
			if (pairs[i].counter.isMoreThan(maxPair.counter)) {
				maxPair = pairs[i]
			}
		}

		return maxPair.move
	}
}

enum AllyEnemyCell {
	Empty = 0,
	Ally = 1,
	Enemy = 2
}
