import { Game } from 'src/games/game'
import { GomokuBoard } from './gomoku-board'
import GomokuField from './gomoku-field';
import GomokuMove from './gomoku-move';
import GomokuRandomBot from './gomoku-random-bot';

export class Gomoku extends Game<GomokuBoard, GomokuMove, GomokuField> {
  public get name () {
    return 'Gomoku'
  }

  makeBot(complexity: number) {
    return new GomokuRandomBot()
  }

  getData(): object {
    return {}
  }
}