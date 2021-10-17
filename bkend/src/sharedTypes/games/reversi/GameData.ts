import { Probabilities, Score } from '../../common'
import ReversiField from './field'

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
  history: ReversiField[]
  isGameOver: boolean
  currentPlayer: ReversiCell

  probs: never|Probabilities[][]
  yourScore: never|Score
}