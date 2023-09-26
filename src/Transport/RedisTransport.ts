import {TransportInterface, TransportEvent, TransportEventCallback, TransportMessage} from "./TransportTypes";

import type {RedisClientType, RedisDefaultModules, RedisModules} from 'redis'
import {createClient} from 'redis'

type RedisMessage = {
    text: string,
    type: string,
    wsChannelId: string
}

class RedisTransport implements TransportInterface {
    private readonly redis: RedisClientType<RedisDefaultModules & RedisModules, {}, {}>;

    private connected: boolean = false;

    private readonly port: number;
    private readonly host: string;
    private readonly debug: boolean = false;

    private events: {
        err?: TransportEventCallback,
        log?: TransportEventCallback,
    } = {}

    constructor(port: number, host: string, debug?: boolean) {

        this.port = port;
        this.host = host;
        this.debug = debug ?? false;

        const socket = {
            host: host,
            port: port,
        };

        this.redis = createClient({
            socket
        });

        this.connect();

        this.listen();

    }

    private connect() {
        this.redis.connect().then(() => {
            this.connected = true;
            this.log('redis connected');

            return true;
        }).catch((e) => {
            this.error({text:`Can't connect to redis server with credentials: ${this.host}:${this.port}. ${e}`});
            return false;
        });
    }

    private async listen() {
        const callbackFn = this.events?.log || ((msg: TransportMessage) => this.log(msg.text))

        await this.redis.subscribe("scheduler-ws-server-log", (message: string) => {
            const redisMsg: RedisMessage = JSON.parse(message);

            const msg: TransportMessage = {
                text: redisMsg.text,
                type: redisMsg.type,
                taskId: redisMsg.wsChannelId
            }

            callbackFn(msg)
        });
    }


    on: (event: TransportEvent, callback: (args?: any) => void) => this = (event, callback) => {
        this.events[event] = callback;

        return this;
    }

    private log(msg: string) {
        if (this.debug) {
            console.log(msg);
        }
    }

    private error(msg: TransportMessage) {

        if (this.events?.err) {
            this.events.err(msg)
        } else {
            console.warn(msg.text)
        }
    }

}

export {RedisTransport, RedisMessage}