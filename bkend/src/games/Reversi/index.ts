import { Game } from '../../interfaces/game'
import ReversiBoard from './Board'
import ReversiField from './field'
import ReversiMove from './move'

export default class Reversi extends Game<ReversiBoard, ReversiMove, ReversiField> {}