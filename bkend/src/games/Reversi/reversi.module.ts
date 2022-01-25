import { Module } from "@nestjs/common";
import { RoomsModule } from "src/rooms/rooms.module";
import { ReversiController } from "./reversi.controller";
import { ReversiService } from "./reversi.service";

@Module({
	imports: [RoomsModule],
	controllers: [ReversiController],
	providers: [ReversiService]
})
export class ReversiModule {}