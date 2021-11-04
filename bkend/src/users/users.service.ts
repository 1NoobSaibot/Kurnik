import { Injectable } from '@nestjs/common';
import { UserDto } from './UserDtos';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
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
    return this.users[+id - 1];
  }

  async getUserByAuthData (login: string, password: string): Promise<UserDto|null> {
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

  async storeUser (name: string, password: string) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].name == name) {
        throw new Error('This nickname is already in use')
      }
    }

    const id = this.users.length + 1
    const user = {
      id,
      name,
      password
    }
    this.users.push(user)
    return user
  }
}
