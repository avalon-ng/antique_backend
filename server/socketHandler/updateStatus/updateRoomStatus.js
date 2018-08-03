import { Rooms, Users } from '../../state';

const { getRoomsStatus } = Rooms;
const { getUser } = Users;

const processEvent = ({ socket, data: param, io }) => {
  const rooms = getRoomsStatus();
  io.to('lobby').emit('updateRoomStatus', { result: true, data: { rooms } });
};

const updateRoomStatus = (socket, io) => {
  socket.on('updateRoomStatus', (data) => {
    processEvent({ socket, data, io });
  });
};

export default updateRoomStatus;
