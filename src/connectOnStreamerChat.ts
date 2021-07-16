import { ChatConnectionConfig } from "./ChatConnectionConfig";
import { sleep } from "./sleep";
import { WebSocketClient } from "./WebSocketClient";

export const connectOnStreamerChat = async (config: ChatConnectionConfig, wsClient: WebSocketClient) => {
    await sleep(10)
    wsClient.sendMessage('CAP REQ :twitch.tv/tags twitch.tv/commands')

    await sleep(5)
    wsClient.sendMessage(`PASS oauth:${config.oAuthValue}`)

    await sleep(5)
    wsClient.sendMessage(`NICK ${config.username}`)

    await sleep(5)
    wsClient.sendMessage(`USER ${config.username} 8 * :${config.username}`)

    await sleep(5)
    wsClient.sendMessage(`JOIN #${config.streamer}`)
}