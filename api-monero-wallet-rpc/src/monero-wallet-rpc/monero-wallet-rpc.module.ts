import { Module } from '@nestjs/common';
import { MoneroWalletRpcService } from './monero-wallet-rpc.service';
import { MoneroWalletRpcController } from './monero-wallet-rpc.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule

  ],
  providers: [MoneroWalletRpcService,ConfigService],
  controllers: [MoneroWalletRpcController]
})
export class MoneroWalletRpcModule {}
