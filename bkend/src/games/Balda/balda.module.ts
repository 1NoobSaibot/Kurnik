import { Module } from '@nestjs/common';
import { BaldaController } from './balda.controller';
import { BaldaService } from './balda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaldaWord } from './word.entity'
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([BaldaWord]),
		RoomsModule
	],
	controllers: [BaldaController],
	providers: [BaldaService]
})
export class BaldaModule {}