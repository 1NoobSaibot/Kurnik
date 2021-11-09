import IField from './IField'
import { UserDto } from 'src/users/UserDtos'

export interface IPlayer<Field extends IField, Move> {
  getMove(field: Field, moves: Move[]): Promise<Move|null>
  isBot: boolean
  isUser: boolean
}

export class Player<Field extends IField, Move> implements IPlayer<Field, Move> {
  private _user?: UserDto
  
  constructor(user?: UserDto) {
    this._user = user
  }

  getMove(field: Field): Promise<Move> {
    throw new Error('User is not a bot')
  }

  public get isBot () {
    return false
  }

  public get isUser () {
    return true
  }
}