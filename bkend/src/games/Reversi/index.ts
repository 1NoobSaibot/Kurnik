import { IPlayer } from 'src/interfaces/IPlayer'
import { Game } from '../../interfaces/game'
import ReversiBoard from './Board'
import ReversiField from './field'
import ReversiMove from './move'
import ReversiRandomBot from './randomBot'

export default class Reversi extends Game<ReversiBoard, ReversiMove, ReversiField> {
  makeBot(complexity: number) : IPlayer<ReversiMove> {
    if (complexity === 0)
      return new ReversiRandomBot()
    return new ReversiRandomBot()
  }
}