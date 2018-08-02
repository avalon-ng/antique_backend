import { getRoom } from './Rooms';

const Users = {

};

const createUser = ({ socketId, name }) => {
  const user = {
    socketId,
    name,
    number: 'lobby'
  };
  const changeRoom = (number) => {
    user.number = number;
  };
  const getState = () => user;
  const isValid = (type) => {
    switch (type) {
      case 'createRoom': {
        const result = user.number === 'lobby';
        isValid.error = result ? '' : 'Joined';
        return result;
      }
      case 'joinRoom': {
        const result = user.number === 'lobby';
        isValid.error = result ? '' : 'Joined';
        return result;
      }
      default:
        return false;
    }
  };
  return {
    getState,
    isValid,
    changeRoom
  };
};

const addUser = ({ data, socket }) => {
  const { id: socketId } = socket;
  const { name } = data;
  const isDuplicate = Object.keys(Users).filter(id => Users[id].getState().name === name).length !== 0;
  if (isDuplicate) {
    return { result: false, message: 'Duplicate' };
  }
  Users[socketId] = createUser({ socketId, name });
  return { result: true };
};

const removeUser = () => {

};

const getUser = (socketId) => {
  return Users[socketId];
};

const getUsersStatus = () => Object
  .keys(Users)
  .sort((id1, id2) => Users[id1].getState().name.localeCompare(Users[id2].getState().name))
  .map((socketId) => {
    const user = Users[socketId];
    const {
      name,
      number
    } = user.getState();
    const room = getRoom(number);
    return {
      name,
      number,
      status: number === 'lobby' ? 'lobby' : room.getState().status
    };
  });


export {
  addUser,
  removeUser,
  getUser,
  getUsersStatus
};
