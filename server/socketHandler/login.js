import { Users } from '../state';

const { addUsers } = Users;

const onEvent = (socket) => {
  socket.on('login', (data) => {
    processEvent({ socket, data });
  })
}

const processEvent = ({ socket, data }) => {
  const { result, message } = addUsers({ socket, data });
  socket.emit('login', { result, message })
}

export {
  onEvent,
  processEvent
};