import { Injectable } from '@nestjs/common'
import { GamesService } from 'src/games/games.service'
import { UsersService } from 'src/users/users.service'
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
    return this._rooms[id]
  }

  public getAllRooms (): UserRoomData[] {
    const res = []
    for (let i = 0; i < this._rooms.length; i++) {
      res.push(this._rooms[i].getDataForUser())
    }
    return res
  }
}
