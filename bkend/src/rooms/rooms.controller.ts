import { Body, Controller, Get, Param, Put, Query, Req, Res } from '@nestjs/common';
import { GamesService } from 'src/games/games.service';
import { Player } from 'src/interfaces/IPlayer';
import { UsersService } from 'src/users/users.service';
import { RoomsService, UserRoomData } from './rooms.service';
import { Request, Response } from 'express';

@Controller('api/room')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly gamesService: GamesService,
    private readonly usersService: UsersService
  ) { }

  @Get()
  getAllRooms() {
    return this.roomsService.getAllRooms()
  }

  @Get(':id')
  async getRoom(
    @Param('id') id: string|number,
    @Res() response: Response
  ) {
    const room = this.roomsService.getRoomById(+id)
    if (room)
      return response.json(room.getDataForPlayer())
    return response.status(404).send('Room not found')
  }

  @Get(':id/game')
  async getGame(
    @Param('id') id: number|string,
    @Res() response: Response
  ) {
    const room = this.roomsService.getRoomById(+id)
    if (room && room.game)
      return response.json(room.game.getData())
    return response.status(404).send('Game not found')
  }

  @Put(':id/game/move')
  async moveGame(
    @Param('id') id: number|string,
    @Body() body: { x: number, y: number },
    @Res() response: Response
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
