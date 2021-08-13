import { Socket } from 'socket.io';
import sanitize from 'sanitize-html';
import Player from '../types/player';
import { Room } from '../types/room';

export default function chatInit(socket: Socket, player: Player, room: Room) {
  socket.on('chat-message', (message: string) => {
    const cleanMessage = sanitize(message).trim();
    if (cleanMessage.length < 1 || cleanMessage.length > 100) return;

    room.emit('chat-message', { author: player.username, content: cleanMessage });
  });
}
