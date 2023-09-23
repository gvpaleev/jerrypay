import { Body, Controller, Get, Post } from '@nestjs/common';
import { MoneroWalletRpcService } from './monero-wallet-rpc.service';
import { CreateSubAccountForReplenishmentDto } from './dto/Creat-subAddress-for-replenishment.dto';
import { GetTxsForSubAddressIndexDto } from './dto/get-txs-for-subAddress-index.dto';
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

@Controller('wallet')
export class MoneroWalletRpcController {
  constructor(
    private readonly moneroWalletRpcService: MoneroWalletRpcService,
  ) {}

  // @Post('create')
  // async create(@Body() dto: CreateWalletDto){

  //     // console.log('Hello World!')
  //     // return 'Hello World!';

  // 	return this.moneroWalletRpcService.create(dto);

  // }

  @Get('createSubAccountForReplenishment')
  async createSubAccountForReplenishment() {
    
    return this.moneroWalletRpcService.createSubAccountForReplenishment();
  }

  @Post('getTxsForSubAddressIndex')
  async getTxsForSubAddressIndex(@Body() dto: GetTxsForSubAddressIndexDto) {
    return this.moneroWalletRpcService.getTxsForSubAddressIndex(dto);
  }
}
