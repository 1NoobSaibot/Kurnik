import { Room } from 'src/rooms/room'
import { Game } from './game'

export abstract class GameService<G extends Game<any, any, any>> {
	private readonly _games: G[] = []

	public getGameById (id: number): G {
		return this._games[id]
	}

	public abstract constructGame (room: Room, id: number, ...args: any[]): G

	public createGame (room: Room, ...args: any[]): G {
		const id = this._findFreeId()
		const game = this.constructGame(room, id, ...args)
		game.addListener('released', (game: G) => {
			this._games[game.id] = null
		})
		return this._storeGame(id, game)
	}

	private _findFreeId (): number {
		for (let i = 0; i < this._games.length; i++) {
			if (!this._games[i]) {
				return i
			}
		}

		return this._games.length
	}

	private _storeGame (id: number, game: G): G {
		this._games[id] = game
		return game
	}

	public abstract 
}
