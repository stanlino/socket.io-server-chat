const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
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