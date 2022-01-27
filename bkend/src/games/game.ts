import { Bot, Human, IPlayer, PlayerDto } from './Player'
import { IBoard, SideInfo } from './IBoard'
import { History } from 'src/games/history'
import { Watcher } from 'src/rooms/watcher'
import { Room } from 'src/rooms/room'

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
export abstract class Game<B extends IBoard<M, F>, M extends Object, F> {
  protected _board: B
  private _history: History<F, M>
  public readonly id: number
  private _state: State = State.Created
  private _players: IPlayer[] = []
  public readonly room: Room

  constructor(id: number, room: Room) {
    this.id = id
    this.room = room
    room.setGame(this)
    this._history = new History<F, M>()
    room.emitGameEvent('game-created', id)
  }

  public abstract get name (): string

  public get isOver () {
    return this._state === State.Ended
  }

  public get isStarted () {
    return this._state !== State.Created
  }

  public get state (): State {
    return this._state
  }

  public start (): boolean {
    if (this.isStarted) {
      return false
    }
    if (this.checkConfig()) {
      this._state = State.Started
      this.room.emitGameEvent('game-started')
      return true
    }
  
    return false
  }
  
  public async next(): Promise<boolean> {
    if (this.currentPlayer.isUser) {
      return false
    }
    const bot = this.currentPlayer as Bot<F, M>
    const field = this._board.getField()
    const move = await bot.getMove(field)
    return this._moveAndRegister(move)
  }

  public getHistoryData(): F[] {
    return this._history.getFields()
  }

  public move (wsId: string, args: M): boolean {
    if (this.currentPlayer.isBot || (this.currentPlayer as Human).watcher.containsWsId(wsId) == false) {
      return false
    }
    return this._moveAndRegister(args)
  }

  private get currentPlayer (): IPlayer {
    return this._players[this._board.getCurrentPlayer()]
  }

  public addHuman (side: number, watcher: Watcher): boolean {
    const currentPlayer = this._players[side]
    if (currentPlayer && currentPlayer.isUser) {
      return false
    }
    const player = new Human(watcher)
    return this._setPlayer(side, player)
  }

  public addBot (side: number, watcher: Watcher, complexity: number): boolean {
    const currentPlayer = this._players[side]
    if (currentPlayer && currentPlayer.isUser && (currentPlayer as Human).watcher !== watcher) {
      return false
    }
    return this._setPlayer(side, this.makeBot(complexity))
  }

  public abstract makeBot(complexity: number): Bot<F, M>

  public checkConfig () {
    for (let i = 0; i < this._players.length; i++) {
      if (this._players[i] == null)
        return false;
    }

    return true;
  }

  public getSides(): SideInfo[] {
    return this._board.getSides()
  }

  public getPlayers (): Record<number, PlayerDto|undefined> {
    const res = []
    for (let i = 0; i < this._players.length; i++) {
      res[i] = this._players[i]?.toPlayerDto() ?? undefined
    }
    return res
  }

  public abstract getData() : any

  private _moveAndRegister (args: M): boolean {
    if (this._state != State.Started) {
      return false
    }

    const field = this._board.getField()
    const player = this._board.getCurrentPlayer()
    const accepted = this._board.move(args)

    if (accepted) {
      this.room.emitGameEvent('game-moved')
      this._history.push(field, args, player)
      if (this._board.isGameOver()) {
        this._state = State.Ended
        this.room.emitGameEvent('game-over')
      }
    }

    return accepted
  }

  /**
   * Sets bots or humans
   * @param side 
   * @param player 
   */
   private _setPlayer (side: number, player: IPlayer): boolean {
    if (this._state != State.Created) {
      return false
    }

    this._players[side] = player
    this.room.emitGameEvent('game-config', this.getPlayers())
    return true
  }
}
