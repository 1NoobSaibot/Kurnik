import { Body, Controller, Param, Put, Query, Req, Res } from '@nestjs/common';
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
  async moveGame(
    @Body() body: { x: number, y: number },
    @Res() response: Response,
    @Param('id') id: number|string
  ) {
    const room = this.roomsService.getRoomById(+id)
    if (!room.game || room.game.isOver) {
      room.game = this.gamesService.createReversi()
      const user = this.usersService.getUserById(0)
      room.game.setPlayer(0, new Player(user))
      room.game.setBot(1, 0)
      room.game.start()
    }
    if (room.game.move({ x: body.x, y: body.y }) == false)
      return response.status(400).send('Wrong moving')
    await room.game.next()
    response.json(room.game.getData())
  }
}
