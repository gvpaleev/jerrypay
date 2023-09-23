import { Module } from '@nestjs/common';
import { MoneroWalletRpcService } from './monero-wallet-rpc.service';
import { MoneroWalletRpcController } from './monero-wallet-rpc.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { WalletModel } from './model/creatWallet.model/wallet.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule
    // TypegooseModule.forFeature([
    //   {
    //     typegooseClass: WalletModel,
    //     schemaOptions:{
    //       collection:'wallet'
    //     }
    //   }
    // ])
  ],
  providers: [MoneroWalletRpcService],
  controllers: [MoneroWalletRpcController]
})
export class MoneroWalletRpcModule {}
