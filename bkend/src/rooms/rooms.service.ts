import { Injectable } from '@nestjs/common';
import User from '../interfaces/user'

class Watcher {
  readonly user: User;
  // WebSocket; There is have to be an oportunity to send some info to user.
}

class Room {
  public readonly id: number;
  public ownerId: number;
  private watchers: Watcher[]
}

@Injectable()
export class RoomsService {
  private readonly rooms: Room[];
}
