const { messageLink } = require('discord.js');
const ws = require('ws');
const server = new ws.Server({ port: '8082' });


server.on("connection", socket => {
    socket.on('error', console.error)

    console.log("New client connected!");
    socket.on("close", () => {
        console.log("Client disconnected!");
    });

    socket.on('message', function incoming(data, isBinary) {
        const b = Buffer.from(data);
        const ts = b.toString();
        console.log(`Message: ${ts}`);
        server.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary })
            }
        });
    });
});