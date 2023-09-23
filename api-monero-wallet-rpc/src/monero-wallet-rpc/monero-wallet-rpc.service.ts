import { Injectable } from '@nestjs/common';
import { CreateSubAccountForReplenishmentDto } from './dto/Creat-subAddress-for-replenishment.dto';
import { InjectModel } from 'nestjs-typegoose';
import { WalletModel } from './model/creatWallet.model/wallet.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { connectToWalletRpc } from 'monero-javascript';
import { GetTxsForSubAddressIndexDto } from './dto/get-txs-for-subAddress-index.dto';
import { pino } from 'pino';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';

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
export class MoneroWalletRpcService {
  constructor(
    private readonly configService:ConfigService,
    // private readonly logger: PinoLogger
  ) {} // private readonly walletModel: ModelType<WalletModel>, // @InjectModel(WalletModel)

  async createSubAccountForReplenishment() {
    try{
      // console.log('adsasd');
      // this.logger.info('asd')
      let walletRpc = await this.getWallet();

      let subAddress = await walletRpc.createSubaddress(0);

      return {
        address: subAddress.getAddress(),
        index: subAddress.getIndex(),
      };
    }catch(e){
      // console.log(e)
      // this.logger.warn(e) 
    }
    
  }

  async getTxsForSubAddressIndex(dto: GetTxsForSubAddressIndexDto) {
    let walletRpc = await this.getWallet();
    console.log(dto)
    let transfers = await walletRpc.getTransfers({
      isOutgoing: false,
      accountIndex: 0,
      subaddressIndex: dto.addressIndex,
    });

    return transfers.map((moneroTransfer) => {
      return moneroTransfer.getTx().toJson();
    });
  }

  async getWallet() {
    try{
      return await (
        await connectToWalletRpc(
          `${this.configService.get('WALLET_DEMON_RPC_HOST')}:${this.configService.get('WALLET_DEMON_RPC_PORT')}`,
          `${this.configService.get('WALLET_DEMON_RPC_LOGIN')}`,
          `${this.configService.get('WALLET_DEMON_RPC_PASSWORD')}`
        )
      ).openWallet(
        `${this.configService.get('WALLET_LOGIN')}`,
        `${this.configService.get('WALLET_PASSWORD')}`
      
      );
    
    }catch(e){
      // this.logger.warn(e)
    }
  }
 
}
