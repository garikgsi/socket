import {SocketLogger} from "./Logger/SocketLogger";

const {SchedulerEventListener} = require('./schedulerEventListener');
const {RedisTransport} = require('./Transport/RedisTransport');
// const {ConsoleLogger} = require('./Logger/ConsoleLogger');


const redisTransport = new RedisTransport(6379, '127.0.0.1');

// const consoleLogger = new ConsoleLogger();
const socketLogger = new SocketLogger();

const schedulerEventListener = new SchedulerEventListener(redisTransport, socketLogger);

schedulerEventListener.listen();


