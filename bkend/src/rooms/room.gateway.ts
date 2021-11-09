import { SubscribeMessage, WebSocketGateway, OnGatewayConnection } from '@nestjs/websockets';
import { Socket } from 'socket.io'
import { RoomsService } from './rooms.service';

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway implements OnGatewayConnection {
  constructor (private readonly roomsService: RoomsService)
  {}

  handleConnection(client: Socket, ...args: any[]) {
    const roomId = +(client.handshake.query.roomId) // TODO: Get room id
    this.roomsService
      .getRoomById(roomId)
      ?.connect(client)
  }
  
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }
}
