import { Bot, Human, IPlayer, PlayerDto } from './Player'
import { Board } from './board'
import { History } from './history'
import { Room } from 'src/rooms/room'
import { EventEmitter } from 'events'
import { ForbiddenException } from '@nestjs/common'
import { GameData } from './game.data'

export abstract class Game<B extends Board<MoveArgs, BoardState>, MoveArgs, BoardState> {
	public readonly id: number
	public readonly room: Room
	private readonly _emitter: EventEmitter = new EventEmitter()
	private _board: B|null = null
	private _history: History<BoardState, MoveArgs>|null
	private _players: IPlayer[] = []

	constructor (id: number, room: Room) {
		this.id = id
		this.room = room
		/* this._board = this._createBoard()
		this._history = new History<BoardState, MoveArgs>() */
	}

	public get board (): B {
		return this._board
	}
	
	public get isOver (): boolean {
		return this._board?.isGameOver() ?? false
	}

	public get isRunning (): boolean {
		return this._board && !this._board.isGameOver()
	}

	public abstract get name (): string
	protected abstract _createBoard (): B
	protected abstract _createBot (complexity: number): Bot<B, MoveArgs, BoardState>
	protected abstract _getAmountOfPlayers(): number
	protected abstract _getCurrentPlayerIndex(): number

	// TODO: For the future this method should get User-Identifier.
	// Some games can contain some hidden information 
	public getData (): GameData<BoardState> {
		if (this.state == GameState.Created) {
			return this._getDataWhenCreated()
		}
		if (this.state == GameState.Started) {
			return this._getDataWhenGameIsGoing()
		}
		return this._getDataWhenGameIsOver()
	}

	private _getDataWhenCreated (): GameData<BoardState> {
		return {
			state: this.state
		}
	}

	private _getDataWhenGameIsGoing (): GameData<BoardState> {
		return {
			state: this.state,
			board: this.board?.getCopyOfState(),
			history: this._history.getFields(),
			currentPlayer: this._getCurrentPlayerIndex()
		}
	}

	// TODO: Find a way to return score for all of games
	private _getDataWhenGameIsOver (): GameData<BoardState> {
		return {
			state: this.state,
			board: this.board?.getCopyOfState(),
			history: this._history.getFields(),
			// winner: this._getWinnerIndex()
		}
	}

	public get state (): GameState {
		if (!this._board) {
			return GameState.Created
		}
		if (this._board.isGameOver()) {
			return GameState.Ended
		}
		return GameState.Started
	}

	public start (wsId: string): boolean {
		if (this.isRunning) {
			return false
		}
		this.room.checkPermission(wsId, 'game-start')
		
		if (!this.isConfigComplete()) {
			return false
		}
	
		this._board = this._createBoard()
		this._board.onMove(this._onMove.bind(this))
		this._board.onGameOver(this._onGameOver.bind(this))
		this._history = new History<BoardState, MoveArgs>()
		this._emitter.emit('started')

		this._moveBots()

		return true
	}

	private async _moveBots () {
		while (this.isRunning && this.currentPlayer.isBot) {
			await sleep(1000)
			const bot = this.currentPlayer as Bot<B, MoveArgs, BoardState>
			bot.move(this._board)
		}
	}

	public moveUser (wsId: string, args: MoveArgs): boolean {
		const canMove = this.isRunning
			&& this.currentPlayer.isUser
			&& (this.currentPlayer as Human).watcher.containsWsId(wsId)

		if (!canMove) {
			return false
		}
		// Game observes its board. We will react to successful move inside _onMove callback
		if (this._board.move(args)) {
			this._moveBots()
			return true
		}
		return false
	}

	private get currentPlayer (): IPlayer {
		return this._players[this._getCurrentPlayerIndex()]
	}

	public addHuman (wsId: string, playerIndex: number): boolean {
		if (this.isRunning) {
			throw new ForbiddenException(null, `The game is running`)
		}
		this.room.checkPermission(wsId, 'game-setplayer')

		const watcher = this.room.getWatcherByWsId(wsId)
		const currentPlayer = this._players[playerIndex]
		if (currentPlayer && currentPlayer.isUser) {
			return false
		}
		const player = new Human(watcher)
		return this._setPlayer(playerIndex, player)
	}

	public addBot (wsId: string, side: number, complexity: number): boolean {
		if (this.isRunning) {
			throw new Error(`The game is running`)
		}
		this.room.checkPermission(wsId, 'game-setplayer')
		const watcher = this.room.getWatcherByWsId(wsId)
		const currentPlayer = this._players[side]
		if (currentPlayer && currentPlayer.isUser && (currentPlayer as Human).watcher !== watcher) {
			return false
		}
		return this._setPlayer(side, this._createBot(complexity))
	}

	public isConfigComplete (): boolean {
		for (let i = 0; i < this._players.length; i++) {
			if (this._players[i] == null) {
				return false
			}
		}

		return true
	}

	public getPlayers (): (PlayerDto|null)[] {
		const res = []
		for (let i = 0; i < this._players.length; i++) {
			// TODO: getPublicData() would be better name
			res[i] = this._players[i]?.toPlayerDto() ?? null
		}
		return res
	}

	// TODO: If different events send different arguments - create separated methods for adding listeners
	public addListener (event: GameEvent, fn: (...args: any[]) => void) {
		this._emitter.addListener(event, fn)
	}

	/**
	 * GameServices listen to this event and delete games from their arrays
	 */
	// TODO: Try to find another, more obvious way to release games. 
	public release () {
		this._emitter.emit('released', this)
	}

	private _onMove (board: B, previousState: BoardState, args: MoveArgs) {
		this._registerMove(previousState, args)
		this._emitter.emit('moved')
	}

	private _registerMove (boardState: BoardState, args: MoveArgs) {
		this._history.push(boardState, args)
	}

	private _onGameOver (board: B) {
		this._emitter.emit('over')
	}

	private _setPlayer (side: number, player: IPlayer): boolean {
		this._players[side] = player

		// TODO: Seems like here we should give CONFIG, not only Players
		this._emitter.emit('config', this.getPlayers())
		return true
	}
}

export type GameEvent = 'config'|'started'|'moved'|'over'|'released'

export enum GameState {
	Created,
	Started,
	Ended
}

async function sleep (ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}
