export interface SetPlayerDto {
  wsId: string,
  player: 'me'|'bot',
  side: number,
  complexity?: number
}
