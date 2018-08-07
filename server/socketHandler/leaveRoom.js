import { Rooms, Users } from '../state';

const { getRoom, removeRoom } = Rooms;
const { getUser } = Users;

const processEvent = ({ socket, io }) => {
  const socketId = socket.id;
  const user = getUser(socketId);
  const { number, name } = user.getState();
  const room = getRoom(number);
  if (!room) {
    socket.emit('leaveRoom', { result: false, message: 'Number' });
    return;
  }

  room.removeUser(socketId);
  user.changeRoom('lobby');
  socket.leave(number);
  socket.join('lobby');
  io.to(number).emit('leaveRoom', { result: true, data: { name } });

  if (room.isValid('removeRoom')) {
    removeRoom(number);
  }
};

const leaveRoom = (socket, io) => {
  socket.on('leaveRoom', (data) => {
    processEvent({ socket, data, io });
  });
};

export default leaveRoom;
