import { Injectable } from "@nestjs/common";
import Reversi from "./reversi-game";

@Injectable()
export class ReversiService {
	private readonly _games: Reversi[] = []

	public getGameById (id: number): Reversi {
		return this._games[id]
	}

	public createGame (roomId: number): Reversi {
		for (let i = 0; i < this._games.length; i++) {
			if (this._games[i].isOver) {
				return this._games[i] = new Reversi(i, roomId)
			}
		}

		const id = this._games.length
		const game = new Reversi(id, roomId)
		this._games.push(game)
		return game
	}
}
