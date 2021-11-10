import { Bot } from "src/games/Player"
import ReversiField from "../../sharedTypes/games/reversi/field"
import ReversiMove from "./move"


export default class ReversiRandomBot extends Bot<ReversiField, ReversiMove> {
  async getMove(field: ReversiField, moves: ReversiMove[]) : Promise<ReversiMove> {
    return moves[0]
  }
}