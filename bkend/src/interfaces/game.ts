import { Player, IAI } from './player'

export enum State {
  Initializing,
  Playing,
  End
}

export abstract class Game {
  readonly id: number;
  private _state: State = State.Initializing;
  private _players: Player[];
  private _amountOfPlayers: number = 2;
  private _currentPlayer: number = 0;


  constructor (id: number) {
    this.id = id;
    this._players = new Player[this._amountOfPlayers];
  }

  getState () {
    return this._state;
  };

  start() {
    if (this.checkConfig()) {
      this._state = State.Playing;
      return true;
    }

    return false;
  };

  getCurrentPlayer () {
    return this._players[this._currentPlayer]
  };

  checkConfig () {
    for (let i = 0; i < this._players.length; i++) {
      if (this._players[i] == null)
        return false;
    }

    return true;
  };
}
