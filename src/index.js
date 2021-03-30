const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
    console.log('New websocket connection')

    const message = "Welcome !"

    socket.emit('message', message)

    socket.on('sendMessage', (message) => {
        io.emit('sendMessage', message)
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})