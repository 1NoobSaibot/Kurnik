import { ApiProperty } from "@nestjs/swagger"

export class CreateGameDto {
	@ApiProperty({ type: 'number' })
	gameId: number
}