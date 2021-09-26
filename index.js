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

const namespace = io.of(/^\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/)

namespace.on('connection', (socket) => {

    socket.on('new-message', (msg) => {
      socket.broadcast.emit('new-message', msg)
      socket.emit('uploaded-message', msg.id)
    })
    
    socket.on('message-received', (id_msg) => {
      socket.broadcast.emit('message-received', id_msg)
    })

})

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})