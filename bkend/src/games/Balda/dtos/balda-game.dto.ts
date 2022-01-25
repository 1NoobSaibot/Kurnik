import { ApiProperty } from "@nestjs/swagger";
import { BaldaField } from "../balda.field";

export class BaldaGameDto {
	@ApiProperty({
		type: 'object',
		properties: {
			_m: {
				type: 'array',
				items: {
					type: 'array',
					items: { type: 'string' }
				}
			},
			_players: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						words: { type: 'array', items: { type: 'string' } },
						skipped: { type: 'boolean' }
					}
				}
			}
		}
	})
	board: BaldaField

	@ApiProperty()
	isGameOver: boolean

	@ApiProperty({ description: 'This number is equal to current board side.' })
	currentPlayer: number
}