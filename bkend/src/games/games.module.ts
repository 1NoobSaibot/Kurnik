import { Module } from '@nestjs/common'
import { GamesController } from './games.controller'
import { GamesService } from './games.service'

import { BaldaModule } from './Balda/balda.module'
import { ReversiModule } from './Reversi/reversi.module'

@Module({
  imports: [BaldaModule, ReversiModule],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService]
})
export class GamesModule {}
