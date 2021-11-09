import { Game } from "src/games/game"
import { IBoard } from "src/games/IBoard"
import IField from "src/games/IField"
import { Watcher } from "./watcher"
import { Socket } from 'socket.io'
import { UserDto } from "src/users/UserDtos"

export class Room {
  public readonly id: number
  public ownerId: number
  private _watchers: Watcher[] = []
  public game: Game<IBoard<any, any>, any, IField>

  constructor(id: number) {
    this.id = id
    console.log(`Room (id=${id}) has been created`)
  }

  public getDataForPlayer(): object {
    return {
      game: this.game ? this.game.getData() : undefined
    }
  }

  public getDataForUser(): object {
    return {
      id: this.id,
      game: this.game ? this.game.constructor.name : undefined
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

  public async move (args: Record<string, any>): Promise<boolean> {
    if (this.game.move(args) == false) {
      return false
    }

    this._wsSendMove()
    await this.game.next()
    this._wsSendMove()
    return true
  }

  private _wsSendMove () {
    for (let i = 0; i < this._watchers.length; i++) {
      this._watchers[i].useSocket((ws) => {
        ws.send('move')
      })
    }
  }
}