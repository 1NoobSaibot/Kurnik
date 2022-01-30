import { Bot } from 'src/games/Player'
import { Game } from 'src/games/game'
import ReversiBoard from './reversi-board'
import ReversiField from './reversi-field'
import { ReversiMoveDto } from './dtos/reversi-move.dto'
import ReversiRandomBot from './randomBot'
import { ReversiGameDto } from './dtos/reversi-game.dto'
import { Room } from 'src/rooms/room'

export default class ReversiGame extends Game<ReversiBoard, ReversiMoveDto, ReversiField> {
  constructor(id: number, room: Room) {
    super(id, room)
    this._board = new ReversiBoard()
  }
  
  public get name () {
    return 'Reversi'
  }

  makeBot (complexity: number): Bot<ReversiField, ReversiMoveDto> {
    if (complexity === 0)
      return new ReversiRandomBot()
    // TODO: Make a complexity bot
    return new ReversiRandomBot()
  }

  getData (): ReversiGameDto {
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
