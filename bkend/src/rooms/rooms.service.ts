import { Injectable } from '@nestjs/common'
import { Room } from './room'

export interface UserRoomData {
  id: number,
  gameName: string
}

@Injectable()
export class RoomsService {
  private readonly _rooms: Room[] = []

  public getRoomById(id: number) : Room {
    // TODO: remove the logic after implementing WS
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
