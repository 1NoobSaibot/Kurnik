import { IsNotEmpty } from 'class-validator'

// TODO: Exists / NotExists rules
// TODO: IsEqual rule for password confirmation
export interface UserDto {
  id: number
  name: string
  password: string
}

export class CreateUserDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  confirm: string
}

export class LoginUserDto {
  @IsNotEmpty()
  login: string

  @IsNotEmpty()
  password: string
}
