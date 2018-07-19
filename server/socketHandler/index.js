const bindSocketEvent = (io) => {
  io.on('connection', () => {
    console.log('connected!');
  })
  return io;
}

export {
  bindSocketEvent
}
