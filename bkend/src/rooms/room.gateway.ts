import { NotFoundException } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, OnGatewayConnection } from '@nestjs/websockets';
import { Socket } from 'socket.io'
import { RoomsService } from './rooms.service';

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway implements OnGatewayConnection {
	constructor (private readonly roomsService: RoomsService)
	{}

	handleConnection(client: Socket, ...args: any[]) {
		const roomId = +(client.handshake.query.roomId)
		try {
			const room = this.roomsService.getRoomById(roomId)
			room.connect(client)
		} catch (e) {
			if (e instanceof NotFoundException) {
				client.disconnect()
			}
		}
	}
	
	@SubscribeMessage('message')
	handleMessage(client: Socket, payload: any): string {
		return 'Hello world!';
	}
}
