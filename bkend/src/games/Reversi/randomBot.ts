import { Bot } from "src/games/Player"
import ReversiField from "./reversi-field"
import { ReversiMoveDto } from "./dtos/reversi-move.dto"


export default class ReversiRandomBot extends Bot<ReversiField, ReversiMoveDto> {
  async getMove(field: ReversiField) : Promise<ReversiMoveDto> {
    const moves = field.getMoves()
    return moves[0]
  }
}