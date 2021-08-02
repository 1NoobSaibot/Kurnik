import IField from "./IField";

export enum Score {
	Winner,
	Draw,
	Looser
}

export class SideInfo {
	index: number
	name: string
}

export interface IBoard {
	move(args: object): boolean
	getCurrentPlayer(): number
	isGameOver(): boolean
	getScore(player: number): Score
	getAmountOfPlayers(): number
	getField(): IField
	getSides(): SideInfo[]
}
