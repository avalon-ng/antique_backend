import login from './login';
import createRoom from './createRoom';
import joinRoom from './joinRoom';

const EventList = [
  login,
  createRoom,
  joinRoom
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
