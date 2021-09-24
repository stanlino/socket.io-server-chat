const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.of(/^\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/)
  .on('connection', function(socket) {

    socket.on('new-message', function(data) {
      socket.broadcast.emit('new-message', data)
    });
    
});


server.listen(PORT, () => {
  console.log(`listening on http://localhost:3000`);
});