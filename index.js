const express = require('express')
const socketIO = require('socket.io')

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()

server.use((req, res) => res.sendFile(INDEX, { root: __dirname }))

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
