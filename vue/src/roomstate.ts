import { reactive } from 'vue';
import { Player } from './types/player';
import { RoomDetails } from './types/room';

export type RoomState = {
  // Basic information
  connected: boolean,
  isHost: boolean,
  roomCode: string,

  // Room settings & players
  players: Player[]

  // Game state details
  status: string
  game: string
}

function defaultState(): RoomState {
  return {
    connected: false,
    isHost: false,
    roomCode: '',

    players: [],

    status: '',
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
