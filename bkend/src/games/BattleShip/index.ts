/* import { IBoard, Score, SideInfo } from 'src/interfaces/IBoard'
import IField from 'src/interfaces/IField'
import { Game } from '../../interfaces/game'

enum Type {
  Classic, Russian
}

class Field implements IField {
  public static MakeRandom() : boolean[][] {
    throw new Error("Not Implemented")
  }

  public getDeterminant(): BigInt {
    throw new Error('Not Implemented')
  }
}

class Move {
  readonly x: number
  readonly y: number
}

class Board implements IBoard {
  move({ x, y }: { x: number, y: number }): boolean {
    throw new Error('Not Implemented')
  }

  getCurrentPlayer(): number {
    throw new Error('Not Implemented')
  }

  getScore(player: number): Score {
    throw new Error('Not Implemented')
  }

  isGameOver(): boolean {
    throw new Error('Not Implemented')
  }

  getAmountOfPlayers(): number {
    return 2
  }

  getField(): Field {
    throw new Error('Not Implemented')
  }

  getSides(): SideInfo[] {
    return [
      { index: 0, name: '' },
      { index: 1, name: '' }
    ]
  }
} 

export class BattleShip extends Game<Board, Move, Field> {
}
*/