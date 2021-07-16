import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { startJob } from './startJob';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(server.address() as any).port} :)`);

    startJob().then(() => { console.log('\n\n\n\n\n\n\n\nJOB STARTED\n\n\n\n\n\n\n\n')})
});