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

document.querySelector('#share-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})