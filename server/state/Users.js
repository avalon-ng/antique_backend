const Users = {

};

const addUser = ({ data, socket }) => {
  const { id: socketId } = socket;
  const { name, room = 'lobby' } = data;
  const isDuplicate = Object.keys(Users).filter(socketId => Users[socketId].name === name).length !== 0;
  if (isDuplicate) {
    return { result: false, message: 'Duplicate' };
  }
  Users[socketId] = {
    socketId,
    name,
    room
  };
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