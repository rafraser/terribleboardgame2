import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

export default function init(server: HttpServer) {
  const io = new SocketServer(server, {
    cors: { origin: 'http://localhost:8080' },
  });

  io.on('connection', (socket: Socket) => {
    socket.on('chat-message', (message: string) => {
      io.emit('chat-message', { author: socket.id, body: message });
    });
  });
}
