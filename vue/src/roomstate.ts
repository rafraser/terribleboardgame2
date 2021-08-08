import { reactive } from 'vue';
import { Player } from './types/player';
import { RoomDetails } from './types/room';

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

export function joinLobby(roomData: RoomDetails): void {
  roomState.connected = true;
  roomState.status = 'lobby';
  roomState.roomCode = roomData.roomCode;
  roomState.players = roomData.players;
}

export function updateDetails(roomData: RoomDetails): void {
  roomState.roomCode = roomData.roomCode;
  roomState.players = roomData.players;
  roomState.status = roomData.state.status;
}
