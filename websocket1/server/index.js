const ws = require('ws');
// import ws from 'ws';

let port = 8080;

//  web socket server
const wsserver = new ws.WebSocketServer({ port: port }, () => {
    console.log(`LISTENING ON PORT ${port}`);
});

wsserver.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        /* const payLoad = JSON.parse(message)
        console.log('payLoad:', payLoad)
        console.log('message:', message)
        console.log('Received: %s', message); */

        /* Loop through  all live clients
        Send everyone the message */

        const payLoad = JSON.parse(message);
        wsserver.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                payLoad.type = 'user_message';
                client.send(JSON.stringify(payLoad));
            }
        });
    });
    ws.send('You are successfully connected');

    /* let count = 0;
    setInterval(() => {
        ws.send(`${++count} seconds are over..`);
    }, 1000); */
});
