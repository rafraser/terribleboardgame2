import { io } from 'socket.io-client';

console.log('registering socket');
const socket = io('localhost:3000');
export default socket;
