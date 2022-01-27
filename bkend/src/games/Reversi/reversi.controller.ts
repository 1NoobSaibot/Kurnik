import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { RoomsService } from "src/rooms/rooms.service";
import ReversiMove from "./reversi-move";
import { ReversiService } from "./reversi.service";
import { SetPlayerDto } from "./dtos/set-player.dto";
import { CreateGameDto } from "./dtos/create-game.dto";
import { Room } from "src/rooms/room";

@Controller('api/reversi')
export class ReversiController {
	constructor (
		private readonly _reversiService: ReversiService,
		private readonly _roomService: RoomsService
	) {}

	@Post()
	async createGame (
		@Body() body: CreateGameDto,
		@Res() res: Response
	) {
		const roomId = +body.roomId
		const wsId = body.wsId
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
		const game = this._reversiService.createGame(room)
		return res.json({ gameId: game.id })
	}

	// TODO: Check auth ant access to see game data
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

	@Post(':id/set/player')
	setPlayer (
		@Param('id') id: string,
		@Body() body: SetPlayerDto,
		@Res() res: Response
	) {
		const game = this._reversiService.getGameById(+id)
		const room = this._roomService.getRoomById(game.room.id)
		const watcher = room.getWatcherByWsId(body.wsId)

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
	@Post(':id/start')
	async startGame (
		@Param('id') id: string,
		@Res() res: Response
	) {
		const game = this._reversiService.getGameById(+id)
		if (game.start()) {
			game.next()
			return res.status(200).end()
		}

		return res.status(400).end()
	}

	// TODO: Check auth and allowing to move game
	// TODO: dont use WS_ID for it
	@Put(':id/move')
	async moveGame(
		@Param('id') id: string,
		@Body() body: Record<string, any>,
		@Res() response: Response
	) {
		const wsId = body.wsId
		const game = this._reversiService.getGameById(+id)
		if (!game || game.isOver) {
			return response.status(403).send('Game is over or was not created')
		}
		
		let moved: boolean = await game.move(wsId, body as ReversiMove)
		
		if (!moved) {
			return response.status(400).send('Wrong moving')
		}

		do {
			moved = await game.next()
		} while (moved)

		response.json(game.getData())
	}

	// TODO: Check auth and role in room before start the game
	@Post(':id/restart')
	async restartGame (
		@Param('id') id: string,
		@Body() body: { wsId: string },
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
		const watcher = room.getWatcherByWsId(body.wsId)
		if (!watcher) {
			return res.status(403).send('You can\'t create game here')
		}

		// TODO: Create a game
		const newGame = this._reversiService.createGame(room)
		return res.json({ gameId: newGame.id })
	}
}