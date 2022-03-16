import { ApiProperty } from '@nestjs/swagger'
import { State } from '../../game'
import { PlayerDto } from 'src/games/Player'
import { Probabilities, Score } from '../../common'
import ReversiField from '../reversi-field'

export enum ReversiCell {
  Empty = 0,
  White = 1,
  Black = 2
}

/**
 * Data which game returns about itself
 */
export class ReversiGameDto {
  @ApiProperty({
    type: 'array',
    minLength: 8,
    maxLength: 8,
    items: {
      type: 'array',
      items: { type: 'number', enum: [0, 1, 2] },
      minLength: 8,
      maxLength: 8
    }
  })
  m: ReversiCell[][]

  @ApiProperty()
  history: ReversiField[]

  @ApiProperty({
    type: 'number',
    enum: [0, 1, 2],
    description: '0 - Created, 1 - Started, 2 - Ended'
  })
  state: State

  @ApiProperty({
    type: 'number',
    enum: [0, 1, 2],
    description: '1 - White, 2 - Black, 0 - No One'
  })
  currentPlayer: ReversiCell

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        isBot: { type: 'boolean' },
        complexity: { type: 'number' },
        wsIds: { type: 'array', items: { type: 'string' } }
      }
    },
    description: 'Array can contain empty values when the place for player is free'
  })
  players: (PlayerDto|undefined)[]

  @ApiProperty({
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          w: { type: 'number' },
          d: { type: 'number' },
          l: { type: 'number' }
        }
      }
    }
  })
  probs: never|Probabilities[][]

  @ApiProperty({
    type: 'number',
    enum: [-1, 0, 1],
    required: false
  })
  yourScore?: Score
}