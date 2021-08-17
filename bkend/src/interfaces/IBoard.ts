import IField from "./IField";
import { Score } from '../../../types/common'

export class SideInfo {
	index: number
	name: string
}

export interface IBoard<Move> {
	move(args: Move): boolean
	getCurrentPlayer(): number
	isGameOver(): boolean
	getScore(player: number): Score
	getAmountOfPlayers(): number
	getField(): IField
	getMoves(): Move[]
	getSides(): SideInfo[]
}
