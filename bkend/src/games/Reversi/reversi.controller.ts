import { Body, Controller, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { RoomsService } from "src/rooms/rooms.service";
import { ReversiService } from "./reversi.service";
import { SetPlayerDto } from "./dtos/set-player.dto";
import { CreateGameDto } from "../dtos/created-game.dto";
import { Room } from "src/rooms/room";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { PlayerDto } from "../Player";
import { ReversiMoveDto } from "./dtos/reversi-move.dto";
import { Point } from "../common/point";

@ApiTags('Reversi')
@Controller('api/reversi')
export class ReversiController {
	constructor (
		private readonly _reversiService: ReversiService,
		private readonly _roomService: RoomsService
	) {}

	@ApiCreatedResponse({ type: CreateGameDto, description: 'Game ID' })
	@ApiNotFoundResponse()
	@ApiNotAcceptableResponse()
	@Post()
	async createGame (
		@Query('roomId') roomId: string,
		@Query('wsId') wsId: string,
		@Res() res: Response
	) {
		const room: Room = this._roomService.getRoomById(+roomId)
		const game = room.createGame(wsId, this._reversiService)
		return res.json({ gameId: game.id })
	}

	// TODO: Check auth and access to see game data
	@Get(':id')
	async getGame (
		@Param('id') id: string,
		@Res() response: Response
	) {
		const game = this._reversiService.getGameById(+id)
		if (game) {
			return response.json(game.getData())
		}
		return response.status(404).send('Game is not found')
	}

	@ApiCreatedResponse({ type: PlayerDto, isArray: true })
	@Get(':id/config')
	getConfig (
		@Param('id') id: string,
		@Res() res: Response
	) {
		const game = this._reversiService.getGameById(+id)
		if (!game) {
			return res.status(404).send('Game is not found')
		}
		return res.json(game.getPlayers())
	}

	@ApiOkResponse()
	@ApiForbiddenResponse()
	@Post(':id/set/player')
	setPlayer (
		@Param('id') id: string,
		@Query('wsId') wsId: string,
		@Body() body: SetPlayerDto,
		@Res() res: Response
	) {
		const game = this._reversiService.getGameById(+id)
		const isAccepted = body.player === 'me'
			? game.addHuman(wsId, body.side)
			: game.addBot(wsId, body.side, body.complexity)

		if (isAccepted) {
			return res.status(201).end()
		}
	}

	// TODO: Check auth and role in room before start the game
	@ApiOkResponse()
	@ApiBadRequestResponse()
	@ApiForbiddenResponse()
	@Post(':id/start')
	async startGame (
		@Query('wsId') wsId: string,
		@Param('id') id: string,
		@Res() res: Response
	) {
		const game = this._reversiService.getGameById(+id)
		if (game.start(wsId)) {

			// TODO: Fix this HACK!
			async function looper () {
				let done = false
				do {
					done = await game.next()
				} while (done)
			}
			
			looper()
			
			return res.status(201).end()
		}

		return res.status(400).end()
	}

	// TODO: Check auth and allowing to move game
	// TODO: dont use WS_ID for it
	@ApiOkResponse()
	@ApiForbiddenResponse()
	@ApiBadRequestResponse()
	@Put(':id/move')
	async moveGame(
		@Param('id') id: string,
		@Query('wsId') wsId: string,
		@Body() move: ReversiMoveDto,
		@Res() res: Response
	) {
		const game = this._reversiService.getGameById(+id)
		if (!game || game.isOver) {
			return res.status(403).send('Game is over or was not created')
		}
		
		const position = new Point(move.x, move.y)
		// TODO: Hide it inside the Game<> class
		let moved: boolean = await game.move(wsId, position)
		
		if (!moved) {
			return res.status(400).send('Wrong moving')
		}

		do {
			moved = await game.next()
		} while (moved)
		// All of it

		res.status(201).end()
	}

	// TODO: Check auth and role in room before start the game
	@ApiCreatedResponse({ type: CreateGameDto, description: 'Game ID' })
	@ApiNotFoundResponse()
	@ApiNotAcceptableResponse()
	@Post(':id/restart')
	async restartGame (
		@Param('id') id: string,
		@Query('wsId') wsId: string,
		@Res() res: Response
	) {
		const game = this._reversiService.getGameById(+id)
		// TODO: Create an ErrorType for getGameById Method
		if (!game) {
			res.status(404).send('Game is not found')
		}

		const newGame = game.room.createGame(wsId, this._reversiService)
		return res.json({ gameId: newGame.id })
	}
}
