import * as WebSocket from 'ws'

export class WebSocketClient {
    private url: string
    private webSocket?: WebSocket
    private connectionAttempts: number

    constructor(url: string) {
        this.url = url
        this.webSocket = undefined
        this.connectionAttempts = 1
        this.startConnection()
    }

    private startConnection() {
        if (!this.webSocket) {
            console.log("\x1b[32m",`-----\n\n[${new Date().toISOString()}]: Starting connection with ${this.url}\n\n-----`)
            this.webSocket = new WebSocket(this.url)
            this.webSocket
                .on('message', (data) => this.handleMessageReceiving(data as any))
                .on('close', this.handleConnectionClosing)
        }
    }

    sendMessage(message: string) {
        this.webSocket?.send(message, (error) => {
            if (error) {
                console.log("\x1b[31m",`-----\n\n[${new Date().toISOString()}]: Error when trying to send message: ${error}\n\n-----`)
            } else {
                console.log("\x1b[45m",`-----\n\n[${new Date().toISOString()}]: Message sent: ${message}\n\n-----`)
            }

        })
    }

    private handleMessageReceiving(data: string) {
        if (data.includes('PING')) {
            this.sendPongSignal()
            setTimeout(() => {
                this.sendPingSignal()
            }, 1000)
        }
        if (!data.includes('@badge-info')) {
            console.log(`-----\n\n[${new Date().toISOString()}]: Receiving Message: \n ${data}\n\n-----`)
        }
    }

    private sendPongSignal() {
        this.sendMessage('PONG')
    }

    private sendPingSignal() {
        this.sendMessage('PING')
    }

    private handleConnectionClosing() {
        console.log("\x1b[31m",`-----\n\n[${new Date().toISOString()}]: CONNECTION CLOSED\n\n-----`)
    }
}