import { Bot } from "src/games/Player";
import { Point } from "../common/point";
import { GomokuBoard } from "./gomoku-board";
import { GomokuState } from "./gomoku-state";


export default class GomokuRandomBot extends Bot<GomokuBoard, Point, GomokuState> {
  async move (board: GomokuBoard) {
    throw new Error('Not Implemented')
  }
}
