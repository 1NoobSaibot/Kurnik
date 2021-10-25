import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto, LoginUserDto } from './UserDtos';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';

@Controller('api/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id)
  }

  @Post('login')
  async login(@Body() body: LoginUserDto, @Res() res: Response) {
    const user = await this.usersService.getUserByAuthData(body.login, body.password)
    if (!user) {
      return res.status(401).send('Invalid login or password')
    }

    const jwtTokens = this.authService.makeJWTTokens(user)
    return res.json({
      ...jwtTokens,
      id: user.id,
      name: user.name
    })
  }

  @Post('signin')
  async register(@Body() body: CreateUserDto, @Res() res: Response) {
    // TODO: Make a validation pipe!
    if (!body.name || !body.password || body.password !== body.confirm) {
      return res.status(400).send('Incorrect register data')
    }

    const user = await this.usersService.storeUser(body.name, body.password)
    const jwtTokens = this.authService.makeJWTTokens(user)
    return res.json({
      ...jwtTokens,
      id: user.id,
      name: user.name
    })
  }
}
