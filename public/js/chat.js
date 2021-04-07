const socket = io()

// Elements
const $messageForm = document.querySelector('#messageForm')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $geolocationButton = document.querySelector('#share-location')
const $messages = document.querySelector('#messages')

// Templates
const $messagesTemplate = document.querySelector('#messageTemplate').innerHTML
const $locationTemplate = document.querySelector('#locationTemplate').innerHTML

// Options 
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('locationMessage', (messageLocation) => {
    const html = Mustache.render($locationTemplate, {
        createdAt: moment(messageLocation.createdAt).format('HH:mm'),
        url: messageLocation.url
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('message', (message) => {
    console.log(message.text)
    const html = Mustache.render($messagesTemplate, {
        createdAt: moment(message.createdAt).format('HH:mm'),
        message: message.text
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.messageText.value

    socket.emit('sendMessage', message, (error) => {

        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ""
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }
        
        console.log('Message delivered')
    })
})

$geolocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported')
    }

    $geolocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $geolocationButton.removeAttribute('disabled')
            console.log("Location shared !")
        })
    })
})

socket.emit('join', { username, room })