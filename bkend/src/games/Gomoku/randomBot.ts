import { IPlayer } from "src/interfaces/IPlayer";
import GomokuField from "./field";
import GomokuMove from "./move";


export default class GomokuRandomBot implements IPlayer<GomokuMove> {
  async getMove(field: GomokuField, moves: GomokuMove[]) : Promise<GomokuMove|null> {
    return moves[0]
  }
}