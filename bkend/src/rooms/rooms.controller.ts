import { Controller, Param, Put } from '@nestjs/common';
import { GamesService } from 'src/games/games.service';
import { Player } from 'src/interfaces/IPlayer';
import { UsersService } from 'src/users/users.service';
import { RoomsService } from './rooms.service';

@Controller('api/room')
export class RoomsController {
  private readonly roomsService: RoomsService
  private readonly gamesService: GamesService
  private readonly usersService: UsersService

  constructor(rooms: RoomsService, games: GamesService, users: UsersService) {
    this.roomsService = rooms
    this.gamesService = games
    this.usersService = users
  }

  @Put(':id/game/move')
  moveGame(@Param('id') id: number) {
    const room = this.roomsService.getRoomById(id)
    if (!room.game) {
      room.game = this.gamesService.createReversi()
      const user = this.usersService.getUserById(0)
      room.game.setPlayer(0, new Player(user))
      room.game.setBot(1, 0)
    // game.start()
    }
    // const game = room.game
    // 
    return true
  }
}
