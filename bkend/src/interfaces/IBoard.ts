import IField from "./IField";

export enum Score {
	Winner = 1,
	Draw = 0,
	Looser = -1
}

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
