import { Injectable } from '@nestjs/common';
import User from '../interfaces/user';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(name: String) {
    const id = this.users.length + 1;
    this.users.push({ id, name });
    return id;
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id: String|Number) {
    return this.users[+id];
  }
}
