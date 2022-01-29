import { Probabilities, Score } from '../../typesFromBkend/common'

export enum ReversiCell {
  Empty = 0,
  White = 1,
  Black = 2
}

/**
 * Data which game returns about itself
 */
export interface GameData {
  m: ReversiCell[][]
  isGameOver: boolean
  currentPlayer: ReversiCell

  probs: Probabilities[][]|undefined
  yourScore: never|Score
}