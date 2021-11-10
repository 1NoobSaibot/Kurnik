import IField from './IField'
import { Watcher } from 'src/rooms/watcher'

export interface IPlayer {
  isBot: boolean
  isUser: boolean
}

export class Human implements IPlayer {
  public readonly isBot = false
  public readonly isUser = true
  private readonly _watcher: Watcher
  
  constructor(watcher: Watcher) {
    this._watcher = watcher
  }
}

export abstract class Bot<F extends IField, Move> implements IPlayer {
  public readonly isBot = true
  public readonly isUser = false

  public abstract getMove(field: F, moves: Move[]): Promise<Move>
}