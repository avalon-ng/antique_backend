import { onEvent as login } from './login';
import createRoom from './createRoom';

const EventList = [
  login,
  createRoom
];

const bindSocketEvent = (io) => {
  io.on('connect', (socket) => {
    EventList.forEach(event => event(socket));
  })
  return io;
}

export {
  bindSocketEvent
}
