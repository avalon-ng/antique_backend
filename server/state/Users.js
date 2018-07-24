const Users = {

};

const addUsers = ({ data, socket }) => {
  const { id: socketId } = socket;
  const { name } = data;
  if (Users[name]) {
    return { result: false, message: 'Duplicate' };
  }
  Users[name] = { socketId };
  return { result: true };
}

const removeUsers = () => {

}

export {
  addUsers,
  removeUsers
} 