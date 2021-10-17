import { Injectable } from '@nestjs/common'
import User from '../../interfaces/user'

@Injectable()
export class AuthService {
  makeJWTTokens (user: User): JWTTokens {
    return {
      accessToken: 'accessfake',
      refreshToken: 'refreshfake'
    }
  }
}

interface JWTTokens {
  accessToken: string,
  refreshToken: string
}
