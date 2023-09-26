const {Server} = require("socket.io");

const {HttpServer} = require('./httpServer');

type Cors = {
    origin: string | string[] | false,
    methods?: ['GET' | 'POST']
}

class SocketServer extends Server {
    private static socket: SocketServer;

    constructor(cors: Cors) {
        const httpServer = HttpServer.getInstance();

        super(httpServer, {cors});
    }

    public static getInstance(cors?: Cors): SocketServer {
        if (!SocketServer.socket) {
            SocketServer.socket = new SocketServer(cors || {origin: false});
        }

        return SocketServer.socket
    }
}

export {SocketServer}