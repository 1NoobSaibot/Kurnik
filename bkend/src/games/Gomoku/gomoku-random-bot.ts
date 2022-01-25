import { Bot } from "src/games/Player";
import GomokuField from "./gomoku-field";
import GomokuMove from "./gomoku-move";


export default class GomokuRandomBot extends Bot<GomokuField, GomokuMove> {
  async getMove (field: GomokuField) : Promise<GomokuMove> {
    throw new Error('Not Implemented')
  }
}
