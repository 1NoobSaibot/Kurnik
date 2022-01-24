import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { GamesService } from 'src/games/games.service';
import { UsersService } from 'src/users/users.service';
import { CreateRoomDto, RoomsService } from './rooms.service';
import { Response } from 'express';

@Controller('api/room')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService
  ) { }

  @Get()
  getAllRooms() {
    return this.roomsService.getAllRooms()
  }

  @Get(':id')
  async getRoom (
    @Param('id') id: string|number,
    @Res() response: Response
  ) {
    const room = this.roomsService.getRoomById(+id)
    if (room)
      return response.json(room.getDataForUser())
    return response.status(404).send('Room not found')
  }

  @Post()
  createRoom (@Body() body: CreateRoomDto, @Res() res: Response) {
    const room = this.roomsService.createRoom(body)
    return res.json(room.getDataForUser())
  }
}
