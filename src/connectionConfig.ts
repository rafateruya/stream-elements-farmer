import { ChatConnectionConfig } from "./ChatConnectionConfig";

interface ChatConnectionConfigWithoutStreamer {
    oAuthValue: string
    username: string
}

export const connectionConfig: ChatConnectionConfigWithoutStreamer = {
    oAuthValue: '',
    username: ''
}

export const streamers = ['']