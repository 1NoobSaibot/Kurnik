import { ApiProperty } from '@nestjs/swagger'
import { Watcher } from 'src/rooms/watcher'
import { Board } from './IBoard'

export interface IPlayer {
	isBot: boolean
	isUser: boolean
	toPlayerDto (): PlayerDto
}

export class Human implements IPlayer {
	public readonly isBot = false
	public readonly isUser = true
	public readonly watcher: Watcher
	
	constructor (watcher: Watcher) {
		this.watcher = watcher
	}

	toPlayerDto (): PlayerDto {
		return {
			isBot: false,
			wsIds: this.watcher.getWsIds()
		}
	}
}

export abstract class Bot<B extends Board<Move, BoardState>, Move, BoardState> implements IPlayer {
	public readonly isBot = true
	public readonly isUser = false

	public abstract move (board: B)

	public toPlayerDto (): PlayerDto {
		return {
			isBot: true
		}
	}
}

export class PlayerDto {
	@ApiProperty()
	isBot: boolean

	@ApiProperty({ required: false })
	complexity?: number

	@ApiProperty({ required: false })
	wsIds?: string[]
}
