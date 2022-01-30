import { ApiProperty } from "@nestjs/swagger"

export class ReversiMoveDto {
  @ApiProperty()
  public x: number

  @ApiProperty()
  public y: number
}