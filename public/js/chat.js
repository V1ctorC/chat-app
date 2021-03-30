const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#messageForm').addEventListener('submit', (e) => {
    e.preventDefault()

    const inputMessage = e.target.elements.messageText
    const message = inputMessage.value

    socket.emit('sendMessage', message)
    inputMessage.value = ""
})

socket.on('sendMessage', (message) => {
    console.log(message)
})