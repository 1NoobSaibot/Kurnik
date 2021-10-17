import { Injectable } from '@nestjs/common';
import User from '../interfaces/user';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'test',
      password: '1111'
    }
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: String|Number) {
    return this.users[+id];
  }

  async getUserByAuthData (login: string, password: string): Promise<User|null> {
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i]
      if (user.name === login) {
        if (user.password === password) {
          return user
        } else {
          return null
        }
      }
    }

    return null
  }
}
