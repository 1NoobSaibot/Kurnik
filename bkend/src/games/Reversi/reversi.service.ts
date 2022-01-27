import { Injectable } from "@nestjs/common";
import { Room } from "src/rooms/room";
import Reversi from "./reversi-game";

@Injectable()
export class ReversiService {
	private readonly _games: Reversi[] = []

	public getGameById (id: number): Reversi {
		return this._games[id]
	}

	public createGame (room: Room): Reversi {
		// TODO: You must to remove RELEASED games, not OVER.
		// TODO: Create new prop isReleased and let rooms to set it up
		for (let i = 0; i < this._games.length; i++) {
			if (this._games[i].isOver) {
				return this._games[i] = new Reversi(i, room)
			}
		}

		const id = this._games.length
		const game = new Reversi(id, room)
		this._games.push(game)
		return game
	}
}
