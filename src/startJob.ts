import { connectionConfig, streamers } from "./connectionConfig"
import { connectOnStreamerChat } from "./connectOnStreamerChat"
import { WebSocketClient } from "./WebSocketClient"

export const startJob = async () => {
    const promises = streamers.map(async (streamer) => {
        const wsClient = new WebSocketClient('wss://irc-ws.chat.twitch.tv/')

        return connectOnStreamerChat({
            streamer,
            ...connectionConfig
        }, wsClient)
    })
    await Promise.all(promises)
}