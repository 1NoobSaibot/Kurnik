import { EventEmitter } from 'events'

export abstract class Board<MoveArgs, BoardState> {
	private _isGameOver = false
	private _emitter: EventEmitter = new EventEmitter()

	public isGameOver () {
		return this._isGameOver
	}

	public move (args: MoveArgs): boolean {
		if (this._isGameOver) {
			throw new Error('Moving after the game is over')
		}
		if (!this.canMove(args)) {
			return false
		}

		const previousState = this.getCopyOfState()
		this._move(args)
		this._fireOnMove(previousState, args)
		if (this._checkIsGameOver()) {
			this._setGameOver()
		}
		return true
	}

	public onMove (callback: (board: Board<MoveArgs, BoardState>, previousState: BoardState, args: MoveArgs) => void) {
		this._emitter.addListener(ON_MOVE, callback)
	}
	private _fireOnMove (prevState: BoardState, args: MoveArgs) {
		this._emitter.emit(ON_MOVE, this, prevState, args)
	}

	public onGameOver (callback: (board: Board<MoveArgs, BoardState>) => void) {
		this._emitter.addListener(ON_GAME_OVER, callback)
	}

	private _setGameOver () {
		this._isGameOver = true
		this._emitter.emit(ON_GAME_OVER, this)
	}
	
	public abstract canMove (args: MoveArgs): boolean
	protected abstract _move (args: MoveArgs): void
	protected abstract _checkIsGameOver (): boolean
	/**
	 * This method MUST RETURN DEEP IMMUTABLE clone of boards' state.
	 * It must not be possible to change a state of the board over copies.
	 * And copies must not be changed over the board
	 */
	public abstract getCopyOfState (): BoardState
}

export const ON_GAME_OVER = 'game-over'
export const ON_MOVE = 'move'
