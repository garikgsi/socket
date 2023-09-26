import {LoggerInterface} from "./LoggerTypes";

const {SocketServer} = require('../socketServer');

class SocketLogger implements LoggerInterface {

    private socket;

    constructor() {

        this.socket = SocketServer.getInstance({
            origin: ['http://localhost:3000'],
        })

        if (this.socket) {
            return this
        }

    }

    echo(msg: string, channel?: string): void {
        this.socket.emit(channel || 'any', msg)
    }
}

export {SocketLogger}