import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

import menuInit from './menu';

export default function init(server: HttpServer) {
  const io = new SocketServer(server, {
    cors: { origin: 'http://localhost:8080' },
  });

  io.on('connection', (socket: Socket) => {
    menuInit(socket);
  });
}
