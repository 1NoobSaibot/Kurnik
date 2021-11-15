import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { GamesService } from 'src/games/games.service';
import { UsersService } from 'src/users/users.service';
import { CreateRoomDto, RoomsService } from './rooms.service';
import { Response } from 'express';
import { SetPlayerDto } from './room';

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

  @Post()
  createRoom (@Body() body: CreateRoomDto, @Res() res: Response) {
    const room = this.roomsService.createRoom(body)
    return res.json(room.getDataForUser())
  }

  @Post(':id/set/player')
  setPlayer (
    @Param('id') id: string|number,
    @Body() body: SetPlayerDto,
    @Res() res: Response
  ) {
    const room = this.roomsService.getRoomById(+id)
    if (room.setPlayer(body)) {
      return res.status(201).end()
    }

    return res.status(403).end()
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

  @Post(':id/game/start')
  async startGame (
    @Param('id') id: number|string,
    @Res() res: Response
  ) {
    const room = this.roomsService.getRoomById(+id)
    if (room.game.start()) {
      room.game.next()
      return res.status(200).end()
    }

    return res.status(400).end()
  }

  @Put(':id/game/move')
  async moveGame(
    @Param('id') id: number|string,
    @Body() body: Record<string, any>,
    @Res() response: Response
  ) {
    const wsId = body.wsId
    const room = this.roomsService.getRoomById(+id)
    if (!room.game || room.game.isOver) {
      return response.status(403).send('Game is over or was not created')
    }
    if (await room.move(wsId, body) == false)
      return response.status(400).send('Wrong moving')
    response.json(room.game.getData())
  }
}
