const Rooms = {
};

const generateNumber = () => `${Math.floor(1000 + ((9999 - 1000) * Math.random()))}`;

const createRoom = (data) => {
  const room = {
    number: null,
    creator: null,
    minPlayerAmount: 6,
    maxPlayerAmount: 8,
    maxUserAmount: 8,
    users: [],
    players: [],
    disconnectPlayers: [],
    password: '',
    status: 'waiting'
  };
  const addUser = ({ socketId, name }) => {
    room.users = [...room.users, { socketId, name }];
  };
  const changeCreator = (index) => {
    room.creator = index;
  };
  const getState = () => room;
  const isValid = (type, payload) => {
    switch (type) {
      case 'joinRoom': {
        const { password } = payload;
        const list = [
          { result: room.password === '' || room.password === password, message: 'Password' },
          { result: room.maxPlayerAmount > room.users.length, message: 'Amount' },
          { result: room.status === 'waiting', message: 'Playing' }
        ];
        const condition = list.find(cond => cond.result !== true);
        isValid.error = condition ? condition.message : '';
        return !condition;
      }
      default:
        return false;
    }
  };
  const init = () => {
    let number = generateNumber();
    while (Rooms[number]) {
      number = generateNumber();
    }
    room.number = number;
    room.password = data.password;
  };
  init();
  return {
    addUser,
    changeCreator,
    getState,
    isValid
  };
};

const addRoom = ({ data, socket }) => {
  const { id: socketId } = socket;
  const { password } = data;
  const room = createRoom({ password });
  const { number } = room.getState();
  Rooms[number] = room;
  return { result: true, data: { number, room } };
};

const removeRoom = () => {

};

const getRoom = (number) => {
  return Rooms[number];
};

const getRoomsStatus = () => Object
  .keys(Rooms)
  .sort((n1, n2) => parseInt(n1, 10) - parseInt(n2, 10))
  .map((number) => {
    const room = Rooms[number];
    const {
      users,
      players,
      password,
      minPlayerAmount,
      maxPlayerAmount,
      maxUserAmount,
      creator,
      status
    } = room.getState();
    return {
      number,
      password: password !== '',
      users: users.map(user => user.name),
      players: players.map(player => player.name),
      creator: users[creator].name,
      minPlayerAmount,
      maxPlayerAmount,
      maxUserAmount,
      status
    };
  });


export {
  addRoom,
  removeRoom,
  getRoom,
  getRoomsStatus
};
