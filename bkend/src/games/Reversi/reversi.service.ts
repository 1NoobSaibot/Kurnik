import { Injectable } from "@nestjs/common";
import { Room } from "src/rooms/room";
import { GameService } from "../game.service";
import Reversi from "./reversi-game";

@Injectable()
export class ReversiService extends GameService<Reversi> {
	public constructGame (room: Room, id: number): Reversi {
		return new Reversi(id, room)
	}
}
