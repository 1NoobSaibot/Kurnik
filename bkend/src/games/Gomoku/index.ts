import { Game } from '../../interfaces/game'
import { Board } from './board'
import Field from './field';
import Move from './move';

export class Gomoku extends Game<Board, Move, Field> {}