import { Rooms, Users } from '../../state';

const { getRoomsStatus } = Rooms;
const { getUsersStatus } = Users;

const processEvent = ({ socket, data: param, io }) => {
  const rooms = getRoomsStatus();
  const users = getUsersStatus();
  io.to('lobby').emit('updateLobbyStatus', { result: true, data: { rooms, users } });
};

const updateLobbyStatus = (socket, io) => {
  socket.on('updateLobbyStatus', (data) => {
    processEvent({ socket, data, io });
  });
};

export default updateLobbyStatus;
