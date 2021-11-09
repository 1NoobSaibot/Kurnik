import { Module } from '@nestjs/common';
import { GamesModule } from 'src/games/games.module';
import { UsersModule } from 'src/users/users.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomGateway } from './room.gateway';

@Module({
  imports: [UsersModule, GamesModule],
  controllers: [RoomsController],
  providers: [RoomsService, RoomGateway]
})
export class RoomsModule {}
