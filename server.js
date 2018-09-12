const Express = require('express');
const SocketIO = require('socket.io');
const Http = require('http');
const BTT = require('btt');

const btt = new BTT({
  domain: '127.0.0.1',
  port: 64470,
  protocol: 'http',
  sharedKey: '',
}); 

// initialize Express instance 
const app = Express();

// initialize the http server basing on Express instance 
const server = new Http.Server(app);

// initialize socket io instance with given express
const io = SocketIO(server, {
  serveClient: false,
});

// add basic listener for new connetions
io.on('connection', (socket) => {

  // monit the console that something has happened
  socket.on('message', (data) => {
    socket.broadcast.emit('news', { hello: data.message });
  });
});

app.get('/', (req, res) => {
  res.sendFile('./index.html');
})

app.get('/set', (req, res) => {
  res.send(`yo`);
  io.emit('clipboard', {
    content: req.query.clipboard,
    from: req.query.from
  });
})

// port to listen on
const SERVER_PORT = 5500;

// set express to listen on the given port
server.listen(SERVER_PORT);