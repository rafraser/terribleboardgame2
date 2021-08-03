import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

export default function init(server: HttpServer) {
  const io = new SocketServer(server);

  io.on('connection', (socket: Socket) => {
    console.log('connected', socket.id);
  });
}
