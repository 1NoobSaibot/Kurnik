import { Watcher } from "./watcher"
import { Socket } from 'socket.io'
import { UserDto } from 'src/users/UserDtos'
import { Game } from 'src/games/game'

export class Room {
  public readonly id: number
  public ownerId: number
  public get game (): GameInfo|null {
    if (!this._game) {
      return null
    }
    return {
      id: this._game.id,
      name: this._game.name
    }
  }
  private _watchers: Watcher[] = []
  private _game?: Game<any, any, any>

  constructor (id: number) {
    this.id = id
  }

  public getDataForUser(): object {
    return {
      id: this.id,
      game: this.game
    }
  }

  public connect (ws: Socket, user?: UserDto) {
    if (user) {
      const watcher = this._watchers.find((watcher) => watcher.userId == user.id)
      if (watcher) {
        watcher.addSocket(ws)
        return
      }

      this._watchers.push(new Watcher(ws, user))
      return
    }

    this._watchers.push(new Watcher(ws))
  }

  public getWatcherByWsId (wsId: string): Watcher {
    return this._watchers.find((watcher) => watcher.containsWsId(wsId))
  }

  public setGame (game: Game<any, any, any>) {
    if (this._game && this._game.isOver == false) {
      throw new Error('Current game is not finished')
    }
    this._game = game
  }

  public emitGameEvent (event: GameEvent, ...args: any[]) {
    this._sendToAll((ws) => ws.emit(event, ...args))
  }

  private _sendToAll(fn: (ws: Socket) => void) {
    for (let i = 0; i < this._watchers.length; i++) {
      this._watchers[i].useSocket(fn)
    }
  }
}

export interface GameInfo {
  name: string,
  id: number
}

export type GameEvent = 'game-created'
  |'game-config'
  |'game-started'
  |'game-moved'
  |'game-over'
