import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'altf4altctrldel',
      database: 'kurnik',
      entities: [],
      // TODO: Set it FALSE in production
      synchronize: true,
    }),
    UsersModule,
    RoomsModule,
    GamesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
