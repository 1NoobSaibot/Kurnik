import { Injectable, NotFoundException } from '@nestjs/common'
import { Room } from './room'

export interface UserRoomData {
  id: number,
  gameName: string
}

export interface CreateRoomDto {
  game: string
}

@Injectable()
export class RoomsService {
  private readonly _rooms: Room[] = []

  /**
   * @returns {number} Room ID
   */
  public createRoom (dto: CreateRoomDto): Room {
    const id = this._rooms.length
    const room = new Room(id)
    this._rooms.push(room)

    return room
  }

  public getRoomById (id: number) : Room {
    const room = this._rooms[id]
    if (!room) {
      throw new NotFoundException(`Room ${id} is not found`)
    }
    return room
  }

  public getAllRooms (): UserRoomData[] {
    const res = new Array(this._rooms.length)
    for (let i = 0; i < this._rooms.length; i++) {
      res[i] = this._rooms[i].getDataForUser()
    }
    return res
  }
}
