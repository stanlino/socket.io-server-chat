const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const namespace = io.of('chat')

namespace.on('connection', (socket) => {

    socket.on('new-message', (msg, received) => {
      received('received')
      socket.to(msg.to).emit('new-message', msg)
    })
    
    socket.on('message-received', (data) => {
      socket.to(data.to).emit('message-received', data)
    })

})

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})