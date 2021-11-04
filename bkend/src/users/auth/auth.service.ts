import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserDto } from 'src/users/UserDtos'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService
	) {}

	makeJWTTokens (user: UserDto): JWTTokens {
		const payload = {
			name: user.name,
			id: user.id,
			password: user.password
		}
		return {
			accessToken: this.jwtService.sign(payload),
			refreshToken: 'refreshfake'
		}
	}
}

interface JWTTokens {
	accessToken: string,
	refreshToken: string
}
