import { Controller, Get } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {

  constructor (private readonly gameService: GamesService) {}

  @Get('/')
  getGames () {
    return this.gameService.getGameList()
  }
}
