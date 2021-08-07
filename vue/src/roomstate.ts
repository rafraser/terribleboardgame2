import { reactive } from 'vue';
import { Player } from './types/player';

export type RoomState = {
  connected: boolean,
  status: string,
  roomCode: string,
  players: Player[],
  game: string
}

function defaultState(): RoomState {
  return {
    connected: false,
    status: 'none',
    roomCode: '',
    players: [],
    game: '',
  };
}

// Global & reactive shared data storage for the room state
export const roomState = reactive(defaultState());

export function joinLobby(roomCode: string, players: Player[]): void {
  roomState.connected = true;
  roomState.status = 'lobby';
  roomState.roomCode = roomCode;
  roomState.players = players;
}
