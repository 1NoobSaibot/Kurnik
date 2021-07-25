import IMove from './move'
import User from './user'

export class Player {
  private _core: (User | IAI)
  private _isHuman: boolean

  private constructor () {}

  static makeWithUser (user: User) {
    const player = new Player();
    player._core = user;
    player._isHuman = true;
  }

  static makeWithAI (ai: IAI) {
    const player = new Player();
    player._core = ai;
    player._isHuman = false;
  }
}

export interface IAI {
  getMove(): IMove
}