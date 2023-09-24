import { Body, Controller, Get, Post } from '@nestjs/common';
import { MoneroWalletRpcService } from './monero-wallet-rpc.service';
import { GetTxsForSubAddressIndexDto } from './dto/get-txs-for-subAddress-index.dto';



@Controller('wallet')
export class MoneroWalletRpcController {
  constructor(
    private readonly moneroWalletRpcService: MoneroWalletRpcService,
  ) {}



  @Get('createSubAccountForReplenishment')
  async createSubAccountForReplenishment() {
    
    return this.moneroWalletRpcService.createSubAccountForReplenishment();
  }

  @Post('getTxsForSubAddressIndex')
  async getTxsForSubAddressIndex(@Body() dto: GetTxsForSubAddressIndexDto) {
    return this.moneroWalletRpcService.getTxsForSubAddressIndex(dto);
  }
}
