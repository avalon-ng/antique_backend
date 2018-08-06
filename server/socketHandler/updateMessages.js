import { Users, Messages } from '../state';

const { getUser } = Users;
const { getMessages } = Messages;

const processEvent = ({ socket }) => {
  const socketId = socket.id;
  const user = getUser(socketId);
  const { number } = user.getState();
  const messages = getMessages({ number, socketId });
  socket.emit('sendMessage', { result: true, data: { messages } });
};

const updateMessages = (socket, io) => {
  socket.on('updateMessages', (data) => {
    processEvent({ socket, data, io });
  });
};

export default updateMessages;
