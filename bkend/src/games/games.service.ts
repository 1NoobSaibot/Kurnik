import { Injectable } from '@nestjs/common'

@Injectable()
export class GamesService {
  readonly options: [
    'Gomoku',
    'Reversi'
  ]

  getGameList () {
    return this.options
  }
}
