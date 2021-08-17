import { ReversiCell } from "../../../../types/games/reversi/GameData"

export class ReversiState {
  m: ReversiCell[][]
  currentPlayer: ReversiCell

  public static InitialState() : ReversiState {
    const state = new ReversiState
    state.currentPlayer = ReversiCell.White
    state.m = buildArray()
    return state
  }
}

function buildArray() : ReversiCell[][] {
  let m = new Array(8)
  for (let i = 0; i < m.length; i++)
    m[i] = new Array(8)

  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      m[i][j] = ReversiCell.Empty

  m[3][3] = ReversiCell.White
  m[3][4] = ReversiCell.Black
  m[4][3] = ReversiCell.Black
  m[4][4] = ReversiCell.White

  return m
}
