import { IPlayer } from 'src/games/IPlayer'
import { Game } from 'src/games/game'
import ReversiBoard from './Board'
import ReversiField from '../../sharedTypes/games/reversi/field'
import ReversiMove from './move'
import ReversiRandomBot from './randomBot'
import { GameData } from '../../sharedTypes/games/reversi/GameData'

export default class Reversi extends Game<ReversiBoard, ReversiMove, ReversiField> {
  constructor(id: number) {
    super(id)
    this._board = new ReversiBoard()
  }
  
  makeBot(complexity: number) : IPlayer<ReversiField, ReversiMove> {
    if (complexity === 0)
      return new ReversiRandomBot()
    return new ReversiRandomBot()
  }

  getData() : GameData {
    const { m, currentPlayer } = this._board.getField()

    return {
      m,
      history: this.getHistoryData(),
      isGameOver: this.isOver,
      currentPlayer,

      probs: undefined,
      yourScore: undefined
    }
  }
}
