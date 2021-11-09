import { IPlayer } from "src/games/IPlayer";
import GomokuField from "./field";
import GomokuMove from "./move";


export default class GomokuRandomBot implements IPlayer<GomokuField, GomokuMove> {
  async getMove(field: GomokuField, moves: GomokuMove[]) : Promise<GomokuMove> {
    return moves[0]
  }

  public readonly isBot = true
  public readonly isUser = false
}