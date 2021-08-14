import { IPlayer } from './IPlayer';
import { IBoard, SideInfo } from './IBoard';
import IField from './IField';
// import { History } from 'src/games/history';

export enum State {
  Created,
  Started,
  Ended
}

/**
 * Инкапсулирует игровой цикл
 * И взаимодействие игровой доски с игроками
 * Оборачивает историю ходов
 */
export class Game<B extends IBoard, M, F extends IField> {
  private _board: B;
  // private _history: History<F, M>
  readonly id: number
  private _state: State = State.Created
  protected _players: IPlayer[]

  constructor(id: number) {
    this.id = id;
  }

  public get isOver() {
    return this._state === State.Ended
  }

  public get isStarted() {
    return this._state !== State.Created
  }

  get state(): State {
    return this._state
  }

  start(): boolean {
    if (this.isStarted)
      return false
  
    this.next()
    return true
  }
  
  async next(): Promise<void> {
    const field = this._board.getField()
    const move = await this.currentPlayer.getMove(field)
    this._board.move(move)
  }

  get currentPlayer(): IPlayer {
    return this._players[this._board.getCurrentPlayer()]
  }

  checkConfig() {
    for (let i = 0; i < this._players.length; i++) {
      if (this._players[i] == null)
        return false;
    }

    return true;
  };

  public getSides(): SideInfo[] {
    return this._board.getSides()
  }
}
