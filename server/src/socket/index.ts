import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

import menuInit from './menu';

// If running in development, ensure the socket is configured for CORS
let socketOptions = {};
if (process.env.NODE_ENV === 'development') {
  socketOptions = {
    cors: { origin: process.env.FRONTEND_HOST },
  };
}

export default function init(server: HttpServer) {
  const io = new SocketServer(server, socketOptions);

  io.on('connection', (socket: Socket) => {
    menuInit(socket);
  });
}
