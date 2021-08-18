import { Injectable } from '@nestjs/common'
import { Game } from 'src/interfaces/game'
import { IBoard } from 'src/interfaces/IBoard'
import IField from 'src/interfaces/IField'
import User from '../interfaces/user'

class Watcher {
  readonly user: User
  // WebSocket; There is have to be an oportunity to send some info to user.
}

class Room {
  public readonly id: number
  public ownerId: number
  private watchers: Watcher[] = []
  public game: Game<IBoard<any>, any, IField>

  constructor(id: number) {
    this.id = id
    console.log(`Room (id=${id}) has been created`)
  }

  public getData(): object {
    return {
      game: this.game ? this.game.getData() : undefined
    }
  }
}

@Injectable()
export class RoomsService {
  private readonly rooms: Room[] = []

  public getRoomById(id: number) : Room {
    if (!this.rooms[id])
      this.rooms[id] = new Room(id)

    return this.rooms[id]
  }
}
