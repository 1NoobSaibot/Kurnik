import { Player, IAI } from './player'

export enum State {
  Initializing,
  Playing,
  End
}

export abstract class Game {
  readonly id: number;
  private _state: State = State.Initializing;
  protected _players: Player[];
  private _amountOfPlayers: number = 2;

  constructor(id: number) {
    this.id = id;
    this._players = new Player[this._amountOfPlayers];
  }

  get state(): State {
    return this._state;
  }

  start() {
    if (this.checkConfig()) {
      this._state = State.Playing;
      this.currentPlayer.
      return true;
    }

    return false;
  };

  abstract get currentPlayer(): Player;

  checkConfig() {
    for (let i = 0; i < this._players.length; i++) {
      if (this._players[i] == null)
        return false;
    }

    return true;
  };

  abstract getSides(): { index: number, sideName: string }[]
}
