const Rooms = {

};

const generateNumber = () => `${Math.floor(1000 + (9999 - 1000) * Math.random())}`;

const createRoom = () => {
  const room = {
    number: null,
    creator: null,
    users: [],
    players: []
  };
  const addUser = (name) => {
    room.users = [...room.users, name];
  };
  const changeCreator = (index) => {
    room.creator = index;
  };
  const getState = () => room;
  const init = () => {
    let number = generateNumber();
    while (!!Rooms[number]) {
      number = generateNumber();
    }
    room.number = number;
  };
  init();
  return {
    addUser,
    changeCreator,
    getState
  };
}

const addRoom = ({ data, socket }) => {
  const { id: socketId } = socket;
  const room = createRoom();
  const { number } = room.getState();
  Rooms[number] = room;
  return { result: true, data: { number, room } };
}

const removeRoom = () => {

}

export {
  addRoom,
  removeRoom
} 