import { io } from 'socket.io-client';

console.log('registering socket');
const socket = io(process.env.VUE_APP_API);
console.log(process.env.VUE_APP_API);
console.log(process.env);
socket.on('connect', () => console.log('connected'));
console.log(socket);
export default socket;
