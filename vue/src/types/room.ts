import { Player } from './player';

export type RoomDetails = {
  roomCode: string,
  players: Player[],
  state: { status: string },
}