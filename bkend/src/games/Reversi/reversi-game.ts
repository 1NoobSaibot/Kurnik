import { Bot } from 'src/games/Player'
import { Game } from 'src/games/game'
import ReversiBoard from './reversi-board'
import ReversiField from './reversi-field'
import ReversiMove from './reversi-move'
import ReversiRandomBot from './randomBot'
import { GameData } from './dtos/reversi-game.dto'
import { Room } from 'src/rooms/room'

export default class ReversiGame extends Game<ReversiBoard, ReversiMove, ReversiField> {
  constructor(id: number, room: Room) {
    super(id, room)
    this._board = new ReversiBoard()
  }
  
  public get name () {
    return 'Reversi'
  }

  makeBot (complexity: number): Bot<ReversiField, ReversiMove> {
    if (complexity === 0)
      return new ReversiRandomBot()
    // TODO: Make a complexity bot
    return new ReversiRandomBot()
  }

  getData (): GameData {
    const { m, currentPlayer } = this._board.getField()

    return {
      m,
      history: this.getHistoryData(),
      state: this.state,
      currentPlayer,
      players: this.getPlayers(),

      probs: undefined,
      yourScore: undefined
    }
  }
}
