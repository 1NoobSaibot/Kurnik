import { Probabilities, Score } from '../../typesFromBkend/common'
import { GameData, GameState } from '../common';

export enum ReversiCell {
  Empty = 0,
  White = 1,
  Black = 2
}

export interface ReversiState {
  cells: ReversiCell[][]
  currentSide: ReversiCell
}


/**
 * Data which game returns about itself
 */
export interface ReversiGameData extends GameData<ReversiState>
{ }