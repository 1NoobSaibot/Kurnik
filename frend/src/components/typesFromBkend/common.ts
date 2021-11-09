export interface Probabilities {
  readonly w: number
  readonly d: number
  readonly l: number
}

export enum Score {
	Winner = 1,
	Draw = 0,
	Looser = -1
}

export interface RoomHeaderData {
  id: number,
  game: string
}
