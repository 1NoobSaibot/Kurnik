import { Bot } from "src/games/Player";
import GomokuField from "./field";
import GomokuMove from "./move";


export default class GomokuRandomBot extends Bot<GomokuField, GomokuMove> {
  async getMove (field: GomokuField) : Promise<GomokuMove> {
    throw new Error('Not Implemented')
  }
}
