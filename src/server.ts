import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import admin, { ServiceAccount } from 'firebase-admin'
import { Message } from './@types'
import serviceAccountKey from './serviceAccountKey.json'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3000

const serviceAccount = serviceAccountKey as ServiceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

app.get('/', (request, response) => {
  response.send('Não há nada para ver aqui')
})

const namespace = io.of('chat')

namespace.on('connection', (socket) => {
  socket.on('join-room', room => {
    socket.join(room)
  })

  socket.on('new-message', (msg: Message) => {
    socket.to(msg.to).emit('new-message', msg)
    admin.messaging().sendToTopic(msg.to, {
      notification: {
        title: 'Nova mensagem!',
        body: `${msg.from}: ${msg.message}`
      }
    }, { mutableContent: true })
  })
})

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
