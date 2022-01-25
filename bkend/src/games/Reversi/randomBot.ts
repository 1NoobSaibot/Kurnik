import { Bot } from "src/games/Player"
import ReversiField from "./reversi-field"
import ReversiMove from "./reversi-move"


export default class ReversiRandomBot extends Bot<ReversiField, ReversiMove> {
  async getMove(field: ReversiField) : Promise<ReversiMove> {
    const moves = field.getMoves()
    return moves[0]
  }
}