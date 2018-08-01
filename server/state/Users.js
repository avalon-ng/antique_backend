const Users = {

};

const createUser = ({ socketId, name }) => {
  const user = {
    socketId,
    name,
    room: 'lobby'
  }
  const changeRoom = (room) => {
    user.room = room;
  }
  const getState = () => user;
  const isValid = (type) => {
    switch(type) {
      case 'createRoom': {
        const result = user.room === 'lobby';
        isValid.error = result ? '' : 'Joined';
        return result;
      }
      case 'joinRoom': {
        const result = user.room === 'lobby';
        isValid.error = result ? '' : 'Joined';
        return result;
      }
      default:
        return false;
    };
  }
  return {
    getState,
    isValid,
    changeRoom
  }
}

const addUser = ({ data, socket }) => {
  const { id: socketId } = socket;
  const { name } = data;
  const isDuplicate = Object.keys(Users).filter(socketId => Users[socketId].getState().name === name).length !== 0;
  if (isDuplicate) {
    return { result: false, message: 'Duplicate' };
  }
  Users[socketId] = createUser({ socketId, name });
  return { result: true };
}

const removeUser = () => {

}

const getUser = (socketId) => {
  return Users[socketId];
}

export {
  addUser,
  removeUser,
  getUser
} 