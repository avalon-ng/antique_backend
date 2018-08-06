import { Users, Messages } from '../state';

const { getUser } = Users;
const { addMessage, getMessages } = Messages;

const processEvent = ({ socket, data: param, io }) => {
  const socketId = socket.id;
  const user = getUser(socketId);
  const { number, name } = user.getState();
  const { content } = param;
  addMessage({ content, from: { socketId, name }, date: new Date(), to: number });
  const messages = getMessages({ number, socketId });
  io.to(number).emit('sendMessage', { result: true, data: { messages } });
};

const sendMessage = (socket, io) => {
  socket.on('sendMessage', (data) => {
    processEvent({ socket, data, io });
  });
};

export default sendMessage;
