import { connectionConfig } from "./connectionConfig"
import { connectOnStreamerChat } from "./connectOnStreamerChat"
import { WebSocketClient } from "./WebSocketClient"

export const startJob = async () => {
    const wsClient = new WebSocketClient('wss://irc-ws.chat.twitch.tv/')
    await connectOnStreamerChat(connectionConfig, wsClient)
}