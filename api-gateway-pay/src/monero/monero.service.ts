import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { getAddressForReplenishmentDto } from './dto/address-for-replenishment.dto';
import { AccountService } from 'src/account/account.service';
import axios from 'axios';
import { AccountModel } from 'time/model/account.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoneroService {
    constructor(
        @Inject(forwardRef(() => AccountService)) private readonly accountService: AccountService,
        private readonly configService:ConfigService
    ){}

    async getAddressForReplenishment(dto: getAddressForReplenishmentDto) {
        let account = await this.accountService.getAccount(dto.uid);
        let addressForReplenishment = (
            await axios.get(`${this.configService.get('URL_API_WALLET_RPC')}/wallet/createSubAccountForReplenishment`)
            ).data;


        account.notConfirmedMoneroTrx.push(addressForReplenishment.index);
        account.save();

        return addressForReplenishment
    }

    async updateBalance(account){
        // let account = await this.accountService.getAccount(uid);

        for(let i=0;i<account.notConfirmedMoneroTrx.length;i++){
           let trx = await this.getTrxSubAccount(account.notConfirmedMoneroTrx[i]);
           trx.map(tx=>{
            let { numConfirmations } = tx;
            let { amount } = tx.incomingTransfers[0];
            if(numConfirmations>3){
                account.balanceMonero = Number(account.balanceMonero) + Number(amount);
                account.notConfirmedMoneroTrx.splice(i, 1);
                account.save();
            }
           })
        }
        
        if(account.balanceMonero!=0){
            let priceMonero =  await this.getPriceMonero();
            account.balanceRub = (account.balanceMonero/1000000000000)*priceMonero
            account.save()
        }
        

    }

    async getTrxSubAccount(id:number){
        let trx = await axios.post(
                        'http://127.0.0.1:3001/wallet/getTxsForSubAddressIndex',
                        {
                         addressIndex: id  
                            
                        }
                       
                      )
                    

                return trx.data 
    }

    async getPriceMonero(){
        let priceMonero = await axios.get('http://127.0.0.1:3003/getPriceMoneroToMir')
        return Math.ceil(priceMonero.data);

    }
}
