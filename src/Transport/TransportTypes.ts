type TransportEvent = 'err' | 'log'

type TransportEventCallback = (args?: any) => void

interface TransportInterface {
    on: (event: TransportEvent, callback: TransportEventCallback) => this
}

type TransportMessage = {
    text: string,
    type?: string,
    taskId?: string
}


export {TransportInterface, TransportEvent, TransportEventCallback, TransportMessage};