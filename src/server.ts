import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3000

app.get('/', (request, response) => {
  response.send('Não há nada para ver aqui')
})

const namespace = io.of('chat')

namespace.on('connection', (socket) => {
  socket.on('join-room', room => {
    socket.join(room)
  })

  socket.on('new-message', (msg) => {
    socket.to(msg.to).emit('new-message', msg)
  })
})

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
