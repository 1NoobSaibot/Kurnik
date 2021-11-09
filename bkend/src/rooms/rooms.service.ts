import { Injectable } from '@nestjs/common'
import { GamesService } from 'src/games/games.service'
import { Player } from 'src/games/IPlayer'
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

  constructor (
    private readonly _gamesService: GamesService,
    private readonly _usersService: UsersService
  ) {}

  /**
   * @returns {number} Room ID
   */
  public createRoom (dto: CreateRoomDto): Room {
    const id = this._rooms.length
    const room = new Room(id)
    this._rooms.push(room)

    room.game = this._gamesService.createReversi()
    const user = this._usersService.getUserById(0)
    room.game.setPlayer(0, new Player(user))
    room.game.setBot(1, 0)
    room.game.start()

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
