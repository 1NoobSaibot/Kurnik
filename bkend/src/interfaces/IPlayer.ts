import IField from './IField'

export interface IPlayer {
  getMove(field: IField): Promise<object>
}