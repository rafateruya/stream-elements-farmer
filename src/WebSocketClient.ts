import * as WebSocket from 'ws'
import { sleep } from './sleep'
const RETRIES_LIMIT = 10

export class WebSocketClient {
    private url: string
    private webSocket?: WebSocket
    private connectionAttempts: number
    private sentMessages: string[]
    private pendingMessages: string[]
    private self = this

    constructor(url: string) {
        this.url = url
        this.webSocket = undefined
        this.connectionAttempts = 1
        this.sentMessages = []
        this.pendingMessages = []
        this.startConnection()
    }

    private startConnection() {
        if (!this.webSocket) {
            console.log("\x1b[32m",`-----\n\n[${new Date().toISOString()}]: Starting connection with ${this.url}\n\n-----`)
            try {

                this.webSocket = new WebSocket(this.url)
                this.webSocket
                .on('message', ((data: any) => this.handleMessageReceiving(data as any)).bind(this))
                .on('close', this.handleConnectionClosing.bind(this))
                .on('open', (async () => {
                    this.connectionAttempts = 1
                    for (let i = 0; i <= this.pendingMessages.length; i++) {
                        const pendingMessage = this.pendingMessages[i]
                        this.sendMessage(pendingMessage)
                        await sleep(5)
                    }
                    this.pendingMessages = []
                }).bind(this))
            } catch (e) {
                console.log(`Error trying to connect with ${this.url}`)
                this.handleConnectionClosing()
            }
        }
    }

    sendMessage(message: string) {
        this.webSocket?.send(message, (error) => {
            if (error) {
                console.log("\x1b[31m",`-----\n\n[${new Date().toISOString()}]: Error when trying to send message: ${error}\n\n-----`)
            } else {
                console.log("\x1b[45m",`-----\n\n[${new Date().toISOString()}]: Message sent: ${message}\n\n-----`)
                this.sentMessages.push(message)
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
        if (this.connectionAttempts > RETRIES_LIMIT) {
            console.log("\x1b[31m",`-----\n\n[${new Date().toISOString()}]: CONNECTION CLOSED ! \n\n-----`)
            return
        }
        console.log("\x1b[31m",`-----\n\n[${new Date().toISOString()}]: CONNECTION CLOSED ! Retrying to connect to server... Attempt ${this.connectionAttempts}/${RETRIES_LIMIT}\n\n-----`)
        this.connectionAttempts++
        delete this.webSocket
        this.pendingMessages = [...this.sentMessages]
        this.sentMessages = []
        this.startConnection()
    }
}