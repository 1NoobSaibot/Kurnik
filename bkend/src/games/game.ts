import { Bot, Human, IPlayer } from './Player'
import { IBoard, SideInfo } from './IBoard'
import IField from './IField'
import { History } from 'src/games/history';
import { Watcher } from 'src/rooms/watcher';

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
export abstract class Game<B extends IBoard<M, F>, M extends Object, F extends IField> {
  protected _board: B
  private _history: History<F, M>
  readonly id: number
  private _state: State = State.Created
  private _players: IPlayer[] = []

  constructor(id: number) {
    this.id = id
    this._history = new History<F, M>()
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
  
  public async next(): Promise<boolean> {
    if (this.currentPlayer.isUser) {
      return false
    }
    const bot = this.currentPlayer as Bot<F, M>
    const field = this._board.getField()
    const moves = this._board.getMoves()
    const move = await bot.getMove(field, moves)
    this._moveAndRegister(move)
    return true
  }

  public getHistoryData(): F[] {
    return this._history.getFields()
  }

  public move (args: M): boolean {
    const isAccepted = this._moveAndRegister(args)
    if (this._board.isGameOver())
      this._state = State.Ended
    return isAccepted
  }

  private _moveAndRegister (args: M) {
    const field = this._board.getField()
    const player = this._board.getCurrentPlayer()
    const accepted = this._board.move(args)

    if (accepted)
      this._history.push(field, args, player)
    return accepted
  }

  get currentPlayer (): IPlayer {
    return this._players[this._board.getCurrentPlayer()]
  }

  /**
   * Sets bots or humans
   * @param side 
   * @param player 
   */
  private _setPlayer (side: number, player: IPlayer) {
    if (!this._players)
      this._players = []
    this._players[side] = player
  }

  addHuman (side: number, watcher: Watcher) {
    if (this._state != State.Created)
      throw new Error('Game is already playing or finished. You can\'t set player in this game')
    
    const player = new Human(watcher)
    this._setPlayer(side, player)
  }

  public setBot (side: number, complexity: number) {
    if (this._state != State.Created)
      throw new Error('Game is already playing or finished. You can\'t set player in this game')
    
    this._setPlayer(side, this.makeBot(complexity))
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

  public abstract getData() : any
}
