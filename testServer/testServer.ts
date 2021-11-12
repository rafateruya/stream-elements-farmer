import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
    console.log('client connected to server')
    ws.on('message', (message: string) => {
        console.log('message received: ', message)
    })
});

server.listen(8081, () => {
    console.log(`Server started on port ${(server.address() as any).port} :)`);
});