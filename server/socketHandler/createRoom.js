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
  const user = getUser(socket.id);
  room.addUser(user.name);
  room.changeCreator(0);
  console.log(room.getState());
  socket.emit('createRoom', { result, data })
  socket.join(number);
}

export default createRoom;