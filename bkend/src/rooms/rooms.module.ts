import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomGateway } from './room.gateway';

@Module({
  imports: [UsersModule],
  controllers: [RoomsController],
  providers: [RoomsService, RoomGateway],
  exports: [RoomsService]
})
export class RoomsModule {}
