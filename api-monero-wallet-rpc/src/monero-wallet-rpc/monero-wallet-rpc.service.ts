import { Injectable } from '@nestjs/common';

import { connectToWalletRpc } from 'monero-javascript';
import { GetTxsForSubAddressIndexDto } from './dto/get-txs-for-subAddress-index.dto';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class MoneroWalletRpcService {
  constructor(
    private readonly configService:ConfigService,
  ) {} 

  async createSubAccountForReplenishment() {
    try{

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
    // console.log(dto)
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
