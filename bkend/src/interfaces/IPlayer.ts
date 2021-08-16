import IField from './IField'
import IUser from '../interfaces/user'

export interface IPlayer<Move> {
  getMove(field: IField, moves: Move[]): Promise<Move|null>
}

export class Player<Move> implements IPlayer<Move> {
  private _ws: WebSocket
  private _user: IUser
  
  constructor(user: IUser) {
    this._user = user
  }

  async getMove(field: IField): Promise<Move|null> {
    // _ws.send('Your Turn')
    return null
  }
}