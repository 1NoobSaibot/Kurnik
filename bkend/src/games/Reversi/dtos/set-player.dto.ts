import { ApiProperty } from "@nestjs/swagger"

export class SetPlayerDto {
  @ApiProperty({ enum: ['me', 'bot'] })
  player: 'me'|'bot'

  @ApiProperty()
  side: number

  @ApiProperty({ required: false })
  complexity?: number
}
