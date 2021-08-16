import { Game } from '../../interfaces/game'
import { GomokuBoard } from './board'
import GomokuField from './field';
import GomokuMove from './move';
import GomokuRandomBot from './randomBot';

export class Gomoku extends Game<GomokuBoard, GomokuMove, GomokuField> {
  makeBot(complexity: number) {
    return new GomokuRandomBot()
  }
}