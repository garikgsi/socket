import {LoggerInterface} from "./LoggerTypes";

class ConsoleLogger implements LoggerInterface {
    echo: (msg: string, channel?: string) => void = (msg, channel) => {
        console.log(`Console logger ${!!channel ? `(${channel})` : ''}: ${Date().toString()} ${msg}`);
    }

}

export {ConsoleLogger}