import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { GamesController } from './games/games.controller';
import { GamesService } from './games/games.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, GamesController, RoomsController],
  providers: [AppService, UsersService, GamesService, RoomsService],
})
export class AppModule {}
