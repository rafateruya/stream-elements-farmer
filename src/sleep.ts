const DEFAULT_TIMEOUT = 1

export const sleep = async (timeoutInSeconds?: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, (timeoutInSeconds || DEFAULT_TIMEOUT) * 1000)
    })
}