import { basename } from 'path/posix';
import { Player } from 'src/interfaces/player';
import { Game, State } from '../../interfaces/game'

enum Type {
  Classic, Russian
}

class Field {
  public static MakeRandom() : boolean[][] {
    throw new Error("Not Implemented")
  }
}

export class BattleShip extends Game {
  readonly id: number;

  private type: Type;

  constructor(id: number) {
    super(id)
  }
}