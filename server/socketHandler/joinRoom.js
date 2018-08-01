import { Rooms, Users } from '../state';

const { getRoom } = Rooms;
const { getUser } = Users;

const joinRoom = (socket) => {
  socket.on('joinRoom', (data) => {
    processEvent({ socket, data });
  })
}

const processEvent = ({ socket, data: param }) => {
  const { number, password } = param;
  const socketId = socket.id;
  const room = getRoom(number);
  const user = getUser(socketId);
  if (!room) {
    socket.emit('joinRoom', { result: false, message: 'Number' });
    return;
  }

  if (!user.isValid('joinRoom')) {
    socket.emit('joinRoom', { result: false, message: user.isValid.error });
    return;
  }

  if (!room.isValid('joinRoom', { socketId, password })) {
    socket.emit('joinRoom', { result: false, message: room.isValid.error });
    return;
  }

  const { name } = user.getState();
  room.addUser({ name, socketId });
  user.changeRoom(number);
  socket.emit('joinRoom', { result: true, data: { number } })
  socket.join(number);
}

export default joinRoom;