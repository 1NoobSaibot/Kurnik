import { Game } from '../../interfaces/game'
import { GomokuBoard } from './board'
import GomokuField from './field';
import GomokuMove from './move';

export class Gomoku extends Game<GomokuBoard, GomokuMove, GomokuField> {}