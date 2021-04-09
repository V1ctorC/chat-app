const socket = io()

socket.on('listRooms', (rooms) => {
    console.log(rooms)
    let options = ''
    rooms.forEach(room => {
        options += (`<option value="${room}"></option>`)
    });
    document.querySelector('#listRooms').innerHTML = options
})