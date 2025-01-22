import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:5000', {
  autoConnect: true, // Automatically connect when the client loads
});

export default socket;
