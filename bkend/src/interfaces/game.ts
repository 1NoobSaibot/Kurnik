import { IPlayer } from './IPlayer'
import { IBoard, SideInfo } from './IBoard'
import IField from './IField'
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
export abstract class Game<B extends IBoard<M>, M extends Object, F extends IField> {
  protected _board: B
  // private _history: History<F, M>
  readonly id: number
  private _state: State = State.Created
  private _players: IPlayer<M>[] = []

  constructor(id: number) {
    this.id = id
    console.dir(this)
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
    const moves = this._board.getMoves()
    const move = await this.currentPlayer.getMove(field, moves)
    this._board.move(move)
  }

  get currentPlayer(): IPlayer<M> {
    return this._players[this._board.getCurrentPlayer()]
  }

  setPlayer(side: number, player: IPlayer<M>) {
    if (this._state != State.Created)
      throw new Error('Game is already playing or finished. You can\'t set player in this game')
    
    this._players[side] = player
  }

  setBot(side: number, complexity: number) {
    this._players[side] = this.makeBot(complexity)
  }

  abstract makeBot(complexity: number)

  checkConfig() {
    for (let i = 0; i < this._players.length; i++) {
      if (this._players[i] == null)
        return false;
    }

    return true;
  }

  public getSides(): SideInfo[] {
    return this._board.getSides()
  }

  public abstract getData()
}
