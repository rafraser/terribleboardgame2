import { Server as SocketServer } from 'socket.io';
import Player from './player';

type RoomStateLobby = {
  status: 'lobby',
};

type RoomStateInGame = {
  status: 'ingame',
  game: String
};

export type RoomState =
  | RoomStateLobby
  | RoomStateInGame;

interface RoomList {
  [roomCode: string]: Room
}

export class Room {
  public readonly roomCode: string;

  public players: Player[] = [];

  public state: RoomState = { status: 'lobby' };

  public isPublic: boolean = false;

  private static io: SocketServer;

  private static rooms: RoomList = {};

  private static MAX_PLAYERS = 8;

  /**
   * Find a room with the given code
   *
   * @param roomCode Room ID to search for
   * @returns A room if one exists with that roomCode, otherwise null
   */
  public static findRoom(roomCode: string): Room | null {
    return this.rooms[roomCode];
  }

  /**
   * Get a list of all public rooms that are currently active
   *
   * @returns All public rooms
   */
  public static publicRooms(): Room[] {
    return Object.values(this.rooms).filter((room: Room) => room.isPublic);
  }

  /**
   * Generate a nice room code, with a subset of characters allowed
   * You probably want to use this as Room.randomString(4) to generate a 4-digit room code
   *
   * @param n Number of additional characters to append
   * @param base Base string to append to
   * @returns A newly generated room code
   */
  public static randomString(n: number, base: string = ''): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789';
    const char = letters[Math.floor(Math.random() * letters.length)];

    if (n <= 1) {
      return base + char;
    }
    return this.randomString(n - 1, base + char);
  }

  /**
   * @param username Username to check
   * @returns Whether or not a player with that username is already in the room
   */
  public usernameTaken(username: string): boolean {
    return Object.values(this.players).some((player) => player.username === username);
  }

  /**
   * Add a new player to the room
   * @param player Player to add to the room
   * @returns Index of the new player, or -1 if the room is full
   */
  public addPlayer(player: any): number {
    for (let i = 0; i < Room.MAX_PLAYERS; i += 1) {
      if (!this.players[i]) {
        this.players[i] = player;
        return i;
      }
    }

    return -1;
  }

  /**
   * Remove a player ID from the room
   * If the room has no more players left, it will be removed from the list entirely
   *
   * @param id Player index to remove
   */
  public removePlayer(id: number): void {
    delete this.players[id];
    if (this.playerCount() === 0) delete Room.rooms[this.roomCode];
  }

  /**
   * @returns the number of players currently in the room
   */
  public playerCount(): number {
    return this.players.filter((val) => val !== undefined).length;
  }

  /**
   * @returns whether this room has the maximum number of players
   */
  public isFull(): boolean {
    return this.playerCount() >= Room.MAX_PLAYERS;
  }

  /**
   * Encode some basic room details for networking
   * This includes some basic state information, plus details about the players
   * @returns RoomDetails
   */
  public encodeDetails(): object {
    const encodedPlayers = this.players.map((player) => (
      { username: player.username, score: player.score }
    ));

    return {
      roomCode: this.roomCode,
      state: this.state,
      public: this.isPublic,
      players: encodedPlayers,
    };
  }

  /**
   * Emit some data to all sockets connected to this room
   *
   * This is a nicer way of doing io.to('room').emit(event, data)
   * @param event Name of the event to emit eg
   * @param data Data to send alongside the event
   */
  public emit(event: string, data: any): void {
    Room.io.to(this.roomCode).emit(event, data);
  }

  /**
   * Set the IO instance for the room class
   * This allows us to use new Room().emit(...) in a nice way
   * @param io Socket.io IO instance
   */
  public static setSocketServer(io: SocketServer): void {
    this.io = io;
  }

  /**
   * Create a new room, with a random 4 digit identifier
   * This room will be accessible with Room.findRoom() afterwards
   *
   * @returns Newly created Room
   */
  public static create(isPublic: boolean = false): Room {
    const room = new Room();
    room.isPublic = isPublic;
    Room.rooms[room.roomCode] = room;
    return room;
  }

  public constructor() {
    let roomCode = Room.randomString(4);
    while (roomCode in Room.rooms) {
      roomCode = Room.randomString(4);
    }

    this.roomCode = roomCode;
  }
}
