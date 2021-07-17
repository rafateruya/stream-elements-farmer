import { connectionConfig, streamers } from "./connectionConfig"
import { connectOnStreamerChat } from "./connectOnStreamerChat"
import { WebSocketClient } from "./WebSocketClient"

export const startJob = async () => {
    const wsClient = new WebSocketClient('wss://irc-ws.chat.twitch.tv/')
    const promises = streamers.map(async (streamer) => {
        return connectOnStreamerChat({
            streamer,
            ...connectionConfig
        }, wsClient)
    })
    await Promise.all(promises)
}