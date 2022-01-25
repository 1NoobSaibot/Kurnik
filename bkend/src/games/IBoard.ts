import { Score } from '../sharedTypes/common'

export class SideInfo {
	index: number
	name: string
}

export interface IBoard<Move, F> {
	move(args: Move): boolean
	getCurrentPlayer(): number
	isGameOver(): boolean
	getScore(player: number): Score
	getAmountOfPlayers(): number
	getField(): F
	getSides(): SideInfo[]
}
