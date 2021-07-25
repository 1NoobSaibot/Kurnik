import { Player } from 'src/interfaces/player';
import { Game, State } from '../../interfaces/game'

enum Cell {
  Empty,
  White,
  Black
}

class Field {
  public static MakeRandom() : Cell[][] {
    throw new Error("Not Implemented")
  }
}

export class Gomoku extends Game {
  readonly id: number;


  constructor(id: number) {
    super(id)
  }
}