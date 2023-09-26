import {TransportInterface, TransportMessage} from './Transport/TransportTypes'
import {LoggerInterface} from "./Logger/LoggerTypes";


class SchedulerEventListener {
    private transport: TransportInterface;

    private logger: LoggerInterface;

    constructor(transport: TransportInterface, logger: LoggerInterface) {
        this.transport = transport;

        this.logger = logger;
    }

    public listen(): void {
        this.transport.on('err', (msg: TransportMessage) => {
            this.logger.echo(`error with message ${msg.text}`, msg?.taskId);
        }).on('log', (msg: TransportMessage) => {
            this.logger.echo(msg.text, msg?.taskId);
        })
    }

}

export {SchedulerEventListener}

