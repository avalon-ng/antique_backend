import login from './login';
import createRoom from './createRoom';
import joinRoom from './joinRoom';
import leaveRoom from './leaveRoom';
import { updateRoomStatus, updateLobbyStatus, updateUserStatus } from './updateStatus';
import sendMessage from './sendMessage';
import updateMessages from './updateMessages';

const EventList = [
  login,
  createRoom,
  joinRoom,
  updateRoomStatus,
  updateUserStatus,
  updateLobbyStatus,
  sendMessage,
  updateMessages,
  leaveRoom
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

