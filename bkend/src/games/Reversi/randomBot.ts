import { Bot } from "../Player"
import ReversiField from "./reversi-field"
import { ReversiMoveDto } from "./dtos/reversi-move.dto"


export default class ReversiRandomBot extends Bot<ReversiField, ReversiMoveDto> {
  async getMove(field: ReversiField) : Promise<ReversiMoveDto> {
    const moves = field.getMoves()
    let index = Math.round(Math.random() * moves.length)
    index = index >= moves.length ? 0 : index
    return moves[index]
  }
}