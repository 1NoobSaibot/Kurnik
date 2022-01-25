import { PlayerDto } from 'src/games/Player'
import { Probabilities, Score } from '../../common'
import ReversiField from '../reversi-field'

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
  players: Record<number, PlayerDto|undefined>

  probs: never|Probabilities[][]
  yourScore: never|Score
}