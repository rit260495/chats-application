const io = require('socket.io')(8000) // use in 8000 port  and attach in http instance 

const users = {};

io.on('connection', socket => { // listening event , io.on socket instance 
  socket.on('new-user-joined', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  })
  socket.on('send', message => {
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
  });
  socket.on('disconnect', message => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });


})