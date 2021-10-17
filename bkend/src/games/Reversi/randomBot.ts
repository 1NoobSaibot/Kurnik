import { IPlayer } from "src/interfaces/IPlayer"
import ReversiField from "../../sharedTypes/games/reversi/field"
import ReversiMove from "./move"


export default class ReversiRandomBot implements IPlayer<ReversiMove> {
  async getMove(field: ReversiField, moves: ReversiMove[]) : Promise<ReversiMove|null> {
    return moves[0]
  }
}