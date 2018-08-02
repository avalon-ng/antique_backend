import { Rooms, Users } from '../state';

const { getUsersStatus } = Users;
const { getUser } = Users;

const processEvent = ({ socket, data: param, io }) => {
  const users = getUsersStatus();
  io.to('lobby').emit('updateUserStatus', { result: true, data: { users } });
};

const updateUserStatus = (socket, io) => {
  socket.on('updateUserStatus', (data) => {
    processEvent({ socket, data, io });
  });
};

export default updateUserStatus;
