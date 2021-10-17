import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
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
  async login(@Body() body: LoginData, @Res() res: Response) {
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
}

interface LoginData {
  login: string
  password: string
}
