import { Injectable } from '@nestjs/common';
import { Game } from 'src/interfaces/game';
import { BattleShip } from './BattleShip';
import { Gomoku } from './Gomoku';

const GAMES = [
  BattleShip,
  Gomoku
]

class GameOption {
  id: number;
  name: string;
  game: Function;
}

@Injectable()
export class GamesService {
  readonly options: GameOption[]

  constructor () {
    this.options = new Array<GameOption>(GAMES.length)
    for (let i = 0; i < this.options.length; i++) {
      const game = GAMES[i]
      this.options[i] = {
        id: i + 1,
        name: game.name,
        game: game
      }
    }
  }

  getGameList () {
    return this.options.map(o => ({ id: o.id, name: o.name }))
  }
}
