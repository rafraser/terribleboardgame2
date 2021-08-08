import { Socket } from 'socket.io';
import Player from '../types/player';
import { Room } from '../types/room';

function finaliseRoomConnection(socket: Socket, player: Player, room: Room) {
  room.addPlayer(player);
  socket.join(room.roomCode);
  socket.emit('login-success', { roomCode: room.roomCode });

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
    const player = new Player(username);
    finaliseRoomConnection(socket, player, room);
  });

  socket.on('create-room', (requestedUsername: string) => {
    console.log('creating room', requestedUsername);

    // Validate username
    const [isValidUsername, username] = Player.validateUsername(requestedUsername);
    if (!isValidUsername) {
      socket.emit('login-error', 'Username is invalid');
      return;
    }

    // Create a new room - much simpler validation checks
    const room = Room.create();
    const player = new Player(username);
    finaliseRoomConnection(socket, player, room);
  });
}
