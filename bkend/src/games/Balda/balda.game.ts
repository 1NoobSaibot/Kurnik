import { Room } from "src/rooms/room";
import { Game } from "../game";
import { Bot } from "../Player";
import { BaldaBoard } from "./balda.board";
import { BaldaMove } from "./balda.move";
import { BaldaService } from "./balda.service";
import { BaldaState } from "./balda.state";

export class BaldaGame extends Game<BaldaBoard, BaldaMove, BaldaState> {
	private _service: BaldaService
	private _lang: string
	private _size: number

	constructor (id: number, room: Room, service: BaldaService, lang: string, size: number) {
		super(id, room)
		this._service = service
		this._lang = lang
		this._size = size
	}

	public get name () {
		return 'Balda'
	}

	protected _createBot(complexity: number): Bot<BaldaBoard, BaldaMove, BaldaState> {
		throw new Error('Not Implemented')
	}

	protected _createBoard(): BaldaBoard {
		return new BaldaBoard(this._service, this._lang, this._size)
	}

	protected _getCurrentPlayerIndex(): number {
		return this.board.getCurrentPlayer()
	}

	protected _getAmountOfPlayers(): number {
		return 2
	}
}
