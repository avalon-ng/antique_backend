import { Users } from '../state';

const { addUser } = Users;

const login = (socket) => {
  socket.on('login', (data) => {
    processEvent({ socket, data });
  })
};

const processEvent = ({ socket, data }) => {
  const { result, message } = addUser({ socket, data });
  socket.emit('login', { result, message })
  if (result) {
    socket.join('lobby');
  }
};

export default login;