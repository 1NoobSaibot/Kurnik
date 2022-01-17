import { Body, Controller, Delete, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaldaService } from './balda.service';

@Controller('api/balda')
export class BaldaController {
  constructor (private readonly baldaService: BaldaService) {}

	@Get('/is/word')
	isWord (
		@Query('word') word: string,
		@Query('lang') lang: string,
		@Res() res: Response
	) {
		return res.send(this.baldaService.isWord(word, lang))
	}

	// TODO: check auth with ADMIN role
  @Post('/word')
  async putWord (
		@Query('word') word: string,
		@Query('lang') lang: string,
		@Res() res: Response
	) {
    await this.baldaService.addWord(word, lang)
		return res.sendStatus(200)
  }

	// TODO: check auth with ADMIN role
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
