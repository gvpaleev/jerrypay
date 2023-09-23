import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoneroWalletRpcModule } from './monero-wallet-rpc/monero-wallet-rpc.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { pino } from 'pino';

const fileTransport = pino.transport({
  target: 'pino/file',
  options: { destination: `${__dirname}/app.log` },
});

// const logger = pino({
//   timestamp: pino.stdTimeFunctions.isoTime,
//   formatters: {
//       level: (label) => {
//         return { level: label.toUpperCase() };
//       }
//   },
  
// },fileTransport);

@Module({
  imports: [
    ConfigModule.forRoot(),
    // LoggerModule.forRoot({
    //   // pinoHttp: {
    //   //   transport: {
    //   //     target: 'pino-pretty',
    //   //   },
    //   // }
      
    // }),
    // TypegooseModule.forRootAsync({
    //   imports:[ConfigModule],
    //   inject:[ConfigService],
    //   useFactory: getMongoConfig  
    // }),
    MoneroWalletRpcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 