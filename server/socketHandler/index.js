import login from './login';
import createRoom from './createRoom';
import joinRoom from './joinRoom';
import updateRoomStatus from './updateRoomStatus';

const EventList = [
  login,
  createRoom,
  joinRoom,
  updateRoomStatus
];

const bindSocketEvent = (io) => {
  io.on('connect', (socket) => {
    EventList.forEach(event => event(socket, io));
  });
  return io;
};

export {
  bindSocketEvent
};

