import { Game } from "../game";
import { Bot } from "../Player";
import { BaldaBoard } from "./balda.board";
import { BaldaField } from "./balda.field";
import { BaldaMove } from "./balda.move";
import { BaldaService } from "./balda.service";

export class BaldaGame extends Game<BaldaBoard, BaldaMove, BaldaField> {
	constructor (id: number, service: BaldaService, lang: string, size: number) {
		super(id)
		this._board = new BaldaBoard(service, lang, size)
	}

	getData() {
		
	}

	public makeBot(complexity: number): Bot<BaldaField, BaldaMove> {
		throw new Error('Not Implemented')
	}
}