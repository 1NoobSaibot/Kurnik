import { Module } from '@nestjs/common';
import { BaldaController } from './balda.controller';
import { BaldaService } from './balda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaldaWord } from './word.entity'

@Module({
	imports: [TypeOrmModule.forFeature([BaldaWord])],
	controllers: [BaldaController],
	providers: [BaldaService]
})
export class BaldaModule {}