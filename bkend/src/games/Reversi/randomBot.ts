import { IPlayer } from "src/games/IPlayer"
import ReversiField from "../../sharedTypes/games/reversi/field"
import ReversiMove from "./move"


export default class ReversiRandomBot implements IPlayer<ReversiField, ReversiMove> {
  async getMove(field: ReversiField, moves: ReversiMove[]) : Promise<ReversiMove> {
    return moves[0]
  }

  public readonly isBot = true
  public readonly isUser = false
}