import { Injectable } from '@nestjs/common'
import { Game } from 'src/interfaces/game'
import { IBoard } from 'src/interfaces/IBoard'
import IField from 'src/interfaces/IField'
import { UserDto } from 'src/users/UserDtos'

class Watcher {
  readonly user: UserDto
  // WebSocket; There is have to be an oportunity to send some info to user.
}

class Room {
  public readonly id: number
  public ownerId: number
  private watchers: Watcher[] = []
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
      gameName: this.game ? this.game.constructor.name : undefined
    }
  }
}

export interface UserRoomData {
  id: number,
  gameName: string
}

@Injectable()
export class RoomsService {
  private readonly _rooms: Room[] = []

  public getRoomById(id: number) : Room {
    if (!this._rooms[id])
      this._rooms[id] = new Room(id)

    return this._rooms[id]
  }

  public getAllRooms(): UserRoomData[] {
    const res = []
    for (let i = 0; i < this._rooms.length; i++) {
      res.push(this._rooms[i].getDataForUser())
    }
    return res
  }
}
