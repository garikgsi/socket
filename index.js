const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('runTask', (taskId) => {
    console.log('task running', taskId);
    let logInterval = setInterval(async () => {
      io.emit('log', JSON.stringify(await logObject()));
    }, 1000);

    setTimeout(() => {
      clearInterval(logInterval);
      io.emit('stop', taskId);
    }, 10000)

  })

});

const logObject = async () => {
  const taskId = Math.random() > 0.5 ? 4 : 5;
  const now = new Date;

  return {
    task_id: taskId,
    log_string: `Some mother fucker message ${now.getMilliseconds()}`,
  }
}




server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
