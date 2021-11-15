import { UserDto } from "src/users/UserDtos";
import { Socket } from "socket.io";

export class Watcher {
  private _sockets: Socket[] = []
  private readonly _user?: UserDto

  constructor (ws: Socket, user?: UserDto) {
    this._user = user
    this.addSocket(ws)
  }

  public get userId () {
    return this._user?.id || undefined
  }

  public get userName () {
    return this._user?.name || undefined
  }

  public addSocket (socket: Socket) {
    this._sockets.push(socket)
    socket.addListener('disconnected', () => {
      for (let i = 0; i < this._sockets.length; i++) {
        if (this._sockets[i].id == socket.id) {
          this._sockets.splice(i, 1)
          break
        }
      }
      
      // TODO: Emit an event, when watcher lost all sockets
    })
  }

  public useSocket (fn: (ws: Socket) => void) {
    for (let i = 0; i < this._sockets.length; i++) {
      fn(this._sockets[i])
    }
  }

  public containsWsId (id: string) {
    for (let i = 0; i < this._sockets.length; i++) {
      if (this._sockets[i].id === id) {
        return true
      }
    }

    return false
  }

  public getWsIds (): string[] {
    return this._sockets.map((socket) => socket.id)
  }
}
