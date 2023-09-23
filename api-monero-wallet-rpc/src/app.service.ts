import { Injectable, Logger } from '@nestjs/common';
import { pino } from 'pino';

// const fileTransport = pino.transport({
//   target: 'pino/file',
//   options: { destination: `${__dirname}/app.log` },
// });

// const logger = pino({
//   timestamp: pino.stdTimeFunctions.isoTime,
//   formatters: {
//       level: (label) => {
//         return { level: label.toUpperCase() };
//       }
//   },
  
// },fileTransport);




@Injectable()
export class AppService {
  // private readonly logger = new Logger(AppService.name);
  private readonly logger = new Logger(AppService.name);
  // private readonly logger = 

  
  getHello(): string {
    this.logger.log('foo');
    this.logger.warn('foo');
    // this.logger.error({ id: `retrieve-all-pokemon-error` }, `Retrieve all Pokemon`) // object passed in first argument

    return 'Hello World!';
  }
}
