import { io } from 'socket.io-client';

const socket = io(process.env.VUE_APP_API);
export default socket;
