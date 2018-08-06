const Messages = {
  lobby: []
};

const addMessage = ({ from, to, content, date }) => {
  Messages[to] = Messages[to] || [];
  if (Messages[to].length <= 70) {
    Messages[to] = [...Messages[to], { from, to, content, date }];
  } else {
    Messages[to] = [...Messages[to], { from, to, content, date }].slice(1);
  }
};

const getMessages = ({ number, socketId }) => {
  return (Messages[number] || []).map((message) => {
    return {
      content: message.content,
      date: message.date,
      from: message.from.name
    };
  });
};

const clearMessage = () => {

}

export {
  addMessage,
  getMessages,
  clearMessage
};
