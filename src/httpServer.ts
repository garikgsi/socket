const express = require("express");
const {createServer} = require("http");

type httpOptions = {
    port: number
}

class HttpServer {
    private static http: HttpServer;

    constructor(options?: httpOptions) {
        const app = express();
        const server = createServer(app);

        server.listen(options?.port || 3001);

        HttpServer.http = server;

        return HttpServer.http;
    }

    public static getInstance(options?: httpOptions) {
        if (!HttpServer.http) {
            HttpServer.http = new HttpServer(options);
        }


        return HttpServer.http;
    }
}

export {HttpServer};