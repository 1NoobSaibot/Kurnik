import { Controller, Param, Put, Req, Res } from '@nestjs/common';
import { GamesService } from 'src/games/games.service';
import { Player } from 'src/interfaces/IPlayer';
import { UsersService } from 'src/users/users.service';
import { RoomsService } from './rooms.service';
import { Request, Response } from 'express';

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
  moveGame(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id') id: number|string
  ) {
    const room = this.roomsService.getRoomById(+id)
    if (!room.game) {
      room.game = this.gamesService.createReversi()
      const user = this.usersService.getUserById(0)
      console.log(room.game)
      room.game.setPlayer(0, new Player(user))
      room.game.setBot(1, 0)
      room.game.start()
    }
    const data = room.game.getData()
    console.log(`room/${id}/game/move [${new Date()}]`)
    response.json(data)
  }
}
