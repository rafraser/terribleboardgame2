import { Socket } from 'socket.io';
import Player from '../types/player';
import { Room } from '../types/room';
import logger from '../logger';
import chatInit from './chat';

function startRoomGameplay(room: Room) {
  // We're ready to start!
  room.state = { status: 'ingame', game: 'none' };
  room.updateDetails();
  room.quiet('request-start-game');
}

function finaliseRoomConnection(socket: Socket, player: Player, room: Room) {
  logger.debug(`${player.username} has connected to ${room.roomCode}`);
  room.addPlayer(player);
  socket.join(room.roomCode);
  socket.emit('login-success', room.encodeDetails());

  // Remove this player when they disconnect
  socket.on('disconnect', () => {
    logger.debug(`${player.username} has disconnected from ${room.roomCode}`);
    room.removePlayer(player);
  });

  // Update other clients
  room.updateDetails();

  // If we're the first player in the game, mark as host
  if (player === room.players[0]) {
    socket.emit('set-room-host');
    socket.on('request-start-game', () => { startRoomGameplay(room); });
  }

  // Register new room handlers
  chatInit(socket, player, room);

  // Now that this socket is connected, there is no need to listen for the menu events
  socket.removeAllListeners('join-room');
  socket.removeAllListeners('create-room');
}

export default function menuInit(socket: Socket) {
  socket.on('join-room', (roomCode: string, requestedUsername: string) => {
    // Validate username
    const [isValidUsername, username] = Player.validateUsername(requestedUsername);
    if (!isValidUsername) {
      socket.emit('login-error', 'Username is invalid');
      return;
    }

    // Check the room state
    const room = Room.findRoom(roomCode);
    if (!room) {
      socket.emit('login-error', 'Room does not exist');
      return;
    }

    if (room.state.status !== 'lobby') {
      socket.emit('login-error', 'Room is already in game');
      return;
    }

    // Verify that the username hasn't been taken yet
    if (room.usernameTaken(username)) {
      socket.emit('login-error', 'Username is already taken');
      return;
    }

    // Verify that the room isn't full
    if (room.isFull()) {
      socket.emit('login-error', 'Room is full');
      return;
    }

    // All is good, add the player to the room
    const player = new Player(username, socket);
    finaliseRoomConnection(socket, player, room);
  });

  socket.on('create-room', (requestedUsername: string) => {
    // Validate username
    const [isValidUsername, username] = Player.validateUsername(requestedUsername);
    if (!isValidUsername) {
      socket.emit('login-error', 'Username is invalid');
      return;
    }

    // Create a new room - much simpler validation checks
    const room = Room.create();
    logger.debug(`${socket.id} created new room ${room.roomCode}`);
    const player = new Player(username, socket);
    finaliseRoomConnection(socket, player, room);
  });
}
