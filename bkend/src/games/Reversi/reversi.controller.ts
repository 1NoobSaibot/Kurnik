import { Body, Controller, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { RoomsService } from "src/rooms/rooms.service";
import ReversiMove from "./reversi-move";
import { ReversiService } from "./reversi.service";
import { SetPlayerDto } from "./dtos/set-player.dto";
import { CreateGameDto } from "../dtos/created-game.dto";
import { Room } from "src/rooms/room";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ReversiGameDto } from "./dtos/reversi-game.dto";
import { PlayerDto } from "../Player";

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
		if (!room) {
			return res.status(404).send('Cannot find room ' + roomId)
		}
		// TODO: Check permission correctly
		const watcher = room.getWatcherByWsId(wsId)
		if (!watcher) {
			return res.status(403).send('You can\'t create game here')
		}

		// TODO: Create a game
		const game = this._reversiService.createGame(room)
		return res.json({ gameId: game.id })
	}

	// TODO: Check auth ant access to see game data
	@ApiCreatedResponse({ type: ReversiGameDto })
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
		const room = game.room
		const watcher = room.getWatcherByWsId(wsId)

		if (!watcher) {
			return res.status(403).end()
		}

		let isAccepted: boolean = false
    if (body.player === 'me') {
      isAccepted = game.addHuman(body.side, watcher)
    } else {
      isAccepted = game.addBot(body.side, watcher, body.complexity)
    }

		if (isAccepted) {
			return res.status(201).end()
		}
		return res.status(403).end()
	}

	// TODO: Check auth and role in room before start the game
	@ApiOkResponse()
	@ApiBadRequestResponse()
	@Post(':id/start')
	async startGame (
		@Param('id') id: string,
		@Res() res: Response
	) {
		const game = this._reversiService.getGameById(+id)
		if (game.start()) {

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
		@Body() body: Record<string, any>,
		@Res() res: Response
	) {
		const wsId = body.wsId
		const game = this._reversiService.getGameById(+id)
		if (!game || game.isOver) {
			return res.status(403).send('Game is over or was not created')
		}
		
		// TODO: Hide it inside the Game<> class
		let moved: boolean = await game.move(wsId, body as ReversiMove)
		
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
		if (!game) {
			res.status(404).send('Game is not found')
		}
		if (!game.isOver) {
			throw new Error('Game is not over yet')
		}

		// TODO: Get config from old game and set it to new one
		const roomId = game.room.id
		const room: Room = this._roomService.getRoomById(roomId)
		if (!room) {
			return res.status(404).send('Cannot find room ' + roomId)
		}
		// TODO: Check permission correctly
		const watcher = room.getWatcherByWsId(wsId)
		if (!watcher) {
			return res.status(403).send('You can\'t create game here')
		}

		// TODO: Create a game
		const newGame = this._reversiService.createGame(room)
		return res.json({ gameId: newGame.id })
	}
}