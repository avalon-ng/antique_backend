import { Rooms, Users } from '../state';

const { addRoom } = Rooms;
const { getUser } = Users;

const createRoom = (socket) => {
  socket.on('createRoom', (data) => {
    processEvent({ socket, data });
  })
}

const processEvent = ({ socket, data: param }) => {
  const { result, data } = addRoom({ socket, data: param });
  const { number, room } = data;
  const socketId = socket.id;
  const user = getUser(socketId);

  if (!user.isValid('createRoom')) {
    socket.emit('createRoom', { result: false, message: user.isValid.error });
    return;
  }

  const { name } = user.getState();
  room.addUser({ name, socketId });
  room.changeCreator(0);
  user.changeRoom(number);
  socket.emit('createRoom', { result, data })
  socket.join(number);
}

export default createRoom;