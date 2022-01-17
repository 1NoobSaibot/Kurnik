import { Body, Controller, Delete, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaldaService } from './balda.service';

@Controller('api/balda')
export class BaldaController {

  constructor (private readonly baldaService: BaldaService) {}

	// TODO: chech auth with ADMIN role
  @Post('/word')
  async putWord (
		@Query('word') word: string,
		@Query('lang') lang: string,
		@Res() res: Response
	) {
    await this.baldaService.addWord(word, lang)
		return res.sendStatus(200)
  }

	@Delete('/word')
	async deleteWord (
		@Query('word') word: string,
		@Query('lang') lang: string,
		@Res() res: Response
	) {
    await this.baldaService.deleteWord(word, lang)
		return res.sendStatus(200)
	}
}
