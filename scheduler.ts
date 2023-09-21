type TransportEvent = 'run'|'error'|'log'|'end'

interface TransportInterface {
  runTask: (taskId: string|number) => Promise<boolean>
  on: (event:TransportEvent, callback:(args?:any) => void) => this
}

interface LoggerInterface {
  echo: (msg) => void
}

class Scheduler {
  private transport: TransportInterface;

  private logger: LoggerInterface;

  constructor (transport: TransportInterface, logger:LoggerInterface) {
    this.transport = transport;

    this.logger = logger;
  }

  public runTask: (taskId: string|number, channelUid: string|number) => void = (taskId, channelUid): void => {
    this.transport.runTask(taskId);

    this.transport.on('run', (msg: string) => {
      this.logger.echo(`task started with message ${msg}`);
    }).on('error', (msg: string) => {
      this.logger.echo(`task error with message ${msg}`);
    }).on('end', (msg: string) => {
      this.logger.echo(`task end with message ${msg}`);
    }).on('log', (msg: string) => {
      this.logger.echo(msg);
    })

  }

}


// const redisTransport: TransportInterface;
// const socketLogger: LoggerInterface;
//
// const scheduler = new Scheduler(redisTransport, socketLogger)
