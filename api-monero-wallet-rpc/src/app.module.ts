import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoneroWalletRpcModule } from './monero-wallet-rpc/monero-wallet-rpc.module';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [
    ConfigModule.forRoot(),
    MoneroWalletRpcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 