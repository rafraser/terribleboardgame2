import { io } from 'socket.io-client';

console.log('registering socket');
const socket = io(process.env.VUE_APP_API);
socket.on('connect', () => console.log('connected'));
export default socket;
