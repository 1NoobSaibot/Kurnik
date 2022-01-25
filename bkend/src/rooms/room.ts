import { Watcher } from "./watcher"
import { Socket } from 'socket.io'
import { UserDto } from 'src/users/UserDtos'
import { Game } from 'src/games/game'

export class Room {
  public readonly id: number
  public ownerId: number
  public get game (): GameInfo|null {
    return this._game
  }
  private _watchers: Watcher[] = []
  private _game?: GameInfo = null

  constructor (id: number) {
    this.id = id
  }

  public getDataForUser(): object {
    return {
      id: this.id,
      game: this._game
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

  public async onMove () {
    
  }

  public setGame (game: Game<any, any, any>) {
    // TODO: Check if previous game didn't finish
    // TODO: listen to events of game
    game.onConfigChanged = (g) => {
      const players = g.getPlayers()
      this._sendToAll((ws: Socket) => {
        ws.emit('config-changed', players)
      })
    }
    game.onMoved = (g) => {
      this._sendToAll((ws) => {
        ws.emit('move')
      })
    }
    game.onGameOver = (g) => {
      this._sendToAll((ws) => {
        ws.emit('game-over')
      })
    }
    this._game = {
      id: game.id,
      name: game.name
    }
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
