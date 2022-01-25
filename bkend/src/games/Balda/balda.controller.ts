import { Body, Controller, Delete, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { RoomsService } from 'src/rooms/rooms.service';
import { BaldaGame } from './balda.game';
import { BaldaService } from './balda.service';

@Controller('api/balda')
export class BaldaController {
  constructor (
		private readonly _baldaService: BaldaService,
		private readonly _roomsService: RoomsService
	) {}

	@Get('/is/word')
	isWord (
		@Query('word') word: string,
		@Query('lang') lang: string,
		@Res() res: Response
	) {
		return res.send(this._baldaService.isWord(word, lang))
	}

	@Get('/random/word')
	getRandomWord (
		@Query('length') length: number,
		@Query('lang') lang: string,
		@Res() res: Response
	) {
		return res.send(this._baldaService.getRandomWord(lang, length))
	}

	// TODO: check auth with ADMIN role
  @Post('/word')
  async putWord (
		@Query('word') word: string,
		@Query('lang') lang: string,
		@Res() res: Response
	) {
    await this._baldaService.addWord(word, lang)
		return res.sendStatus(200)
  }

	// TODO: check auth with ADMIN role
	@Delete('/word')
	async deleteWord (
		@Query('word') word: string,
		@Query('lang') lang: string,
		@Res() res: Response
	) {
    await this._baldaService.deleteWord(word, lang)
		return res.sendStatus(200)
	}

	@Post('/new/game')
	createGame (
		@Query('roomId') roomId: string,
		@Query('size') size: string,
		@Query('lang') lang: string,
		@Res() res: Response
	) {
		const room = this._roomsService.getRoomById(+roomId)
		if (!room) {
			return res.status(404).send('Room not found')
		}
		const game: BaldaGame = this._baldaService.createGame(room.id, lang, +size)
	}
}
