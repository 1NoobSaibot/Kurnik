export enum ReversiCell {
  Empty = 0,
  White = 1,
  Black = 2
}

export class ReversiState {
  cells: ReversiCell[][]
  currentSide: ReversiCell
}
