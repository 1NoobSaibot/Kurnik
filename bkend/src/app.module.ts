import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../ormconfig'

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    RoomsModule,
    GamesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
