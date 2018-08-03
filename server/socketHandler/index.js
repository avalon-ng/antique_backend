import login from './login';
import createRoom from './createRoom';
import joinRoom from './joinRoom';
import { updateRoomStatus, updateLobbyStatus, updateUserStatus } from './updateStatus';

const EventList = [
  login,
  createRoom,
  joinRoom,
  updateRoomStatus,
  updateUserStatus,
  updateLobbyStatus
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

