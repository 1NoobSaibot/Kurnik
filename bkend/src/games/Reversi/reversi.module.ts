import { Module } from '@nestjs/common'
import { RoomsModule } from 'src/rooms/rooms.module'
import { ReversiController } from './reversi.controller'
import { ReversiKnowledgeService } from './reversi-knowledge.service'
import { ReversiService } from './reversi.service'

@Module({
	imports: [RoomsModule],
	controllers: [ReversiController],
	providers: [ReversiService, ReversiKnowledgeService]
})
export class ReversiModule {}
