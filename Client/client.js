const socket = new WebSocket('ws://localhost:8082');



function sendMessage(e) {
    e.preventDefault()
    const input = document.querySelector('input')
    if (input.value) {
        socket.send(input.value)
        input.value = ""
    }
    input.focus()
}

document.querySelector('form')
    .addEventListener('submit', sendMessage)

socket.addEventListener('open', () => {
    console.log("We are connected!");
})

// Listen for messages
socket.addEventListener('message', ({ data }) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})