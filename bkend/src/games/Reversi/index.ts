import { IPlayer } from 'src/interfaces/IPlayer'
import { Game } from '../../interfaces/game'
import ReversiBoard from './Board'
import ReversiField from './field'
import ReversiMove from './move'
import ReversiRandomBot from './randomBot'
import { GameData } from '../../sharedTypes/games/reversi/GameData'

export default class Reversi extends Game<ReversiBoard, ReversiMove, ReversiField> {
  constructor(id: number) {
    super(id)
    this._board = new ReversiBoard()
  }
  
  makeBot(complexity: number) : IPlayer<ReversiMove> {
    if (complexity === 0)
      return new ReversiRandomBot()
    return new ReversiRandomBot()
  }

  getData() : GameData {
    const { m, currentPlayer } = this._board.getField()

    return {
      m,
      isGameOver: this.isOver,
      currentPlayer,

      probs: undefined,
      yourScore: undefined
    }
  }
}
