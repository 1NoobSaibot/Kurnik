import { Room } from "src/rooms/room";
import { Game } from "../game";
import { Bot } from "../Player";
import { BaldaBoard } from "./balda.board";
import { BaldaField } from "./balda.field";
import { BaldaMove } from "./balda.move";
import { BaldaService } from "./balda.service";
import { BaldaGameDto } from "./dtos/balda-game.dto";

export class BaldaGame extends Game<BaldaBoard, BaldaMove, BaldaField> {
	constructor (id: number, room: Room, service: BaldaService, lang: string, size: number) {
		super(id, room)
		this._board = new BaldaBoard(service, lang, size)
	}

	public get name () {
		return 'Balda'
	}

	getData (): BaldaGameDto {
		return {
			board: this._board.getField(),
			isGameOver: this.isOver,
			currentPlayer: this._board.getCurrentPlayer()
		}
	}

	public makeBot(complexity: number): Bot<BaldaField, BaldaMove> {
		throw new Error('Not Implemented')
	}
}