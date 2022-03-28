import { Board } from "../board"
import { TestMove } from "./test-move"


export class TestBoard extends Board<number, number> {
	private _state: number
	private _currentSide: TestSide 
	public calledMethods: string[] = []

	public get side (): TestSide {
		return this._currentSide
	}

	public constructor () {
		super()
		this.onMove((_) => this.calledMethods.push('onMove'))
		this.onGameOver((_) => this.calledMethods.push('onGameOver'))
	}

	public canMove (args: number): boolean {
		this.calledMethods.push('canMove')
		return args != TestMove.WrongMove
	}

	protected _move (args: number): void {
		this.calledMethods.push('_move')
		this._state = args
	}

	protected _checkIsGameOver(): boolean {
		this.calledMethods.push('_checkIsGameOver')
		return this._state == TestMove.EndGame
	}

	public getCopyOfState(): number {
		return this._state
	}

	public clearCalledMethodsOrder() {
		this.calledMethods = []
	}
}

export enum TestSide {
	First,
	Second
}
