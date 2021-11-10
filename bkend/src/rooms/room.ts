import { Game } from "src/games/game"
import { IBoard } from "src/games/IBoard"
import IField from "src/games/IField"
import { Watcher } from "./watcher"
import { Socket } from 'socket.io'
import { UserDto } from "src/users/UserDtos"

export class Room {
  public readonly id: number
  public ownerId: number
  public get game (): Game<IBoard<any, any>, any, IField> {
    return this._game
  }
  private _watchers: Watcher[] = []
  private _game: Game<IBoard<any, any>, any, IField>

  constructor(id: number, game: Game<IBoard<any, any>, any, IField>) {
    this.id = id
    this._game = game
  }

  public getDataForPlayer(): object {
    return {
      game: this._game ? this._game.getData() : undefined
    }
  }

  public getDataForUser(): object {
    return {
      id: this.id,
      game: this._game ? this._game.constructor.name : undefined
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
    if (this._game.move(args) == false) {
      return false
    }

    this._wsSendMove()
    await this._game.next()
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