import { Injectable } from '@nestjs/common';
// import { GetBalanceDto } from './dto/get-balance.dto';
import { InjectModel } from 'nestjs-typegoose';
// import { AccountModel } from './model/account.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { HttpService } from '@nestjs/axios';
// import { getAddressForReplenishmentDto } from './dto/address-for-replenishment.dto';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(
    // @InjectModel(AccountModel)
    // private readonly accountModel: ModelType<AccountModel>,
    // private readonly httpService: HttpService,
  ) {}

  // async getAddressForReplenishment(dto: getAddressForReplenishmentDto) {
  //   let userAccount = await this.getAccount(dto.uid);

  //   let addressForReplenishment = (
  //     await this.httpService.axiosRef(
  //       'http://127.0.0.1:3001/wallet/createSubAccountForReplenishment',
  //       {
  //         params: {
  //           accountIndex: dto.moneroAccountIndex,
  //         },
  //       },
  //     )
  //   ).data;

  //   if (!userAccount) {
  //     
  //   } else {
  //     userAccount.notConfirmedMoneroTrx.push(addressForReplenishment.index);
  //     userAccount.save();
  //   }

  //   return {
  //     uid: dto.uid,
  //     addressForReplenishment,
  //   };
  // }

  // async getBalance(dto: GetBalanceDto) {
  //   let userAccount = await this.getAccount(dto.uid);

  //   if (!userAccount) {
  //     return 0;
  //   }

  //   for (let i = 0; i < userAccount.notConfirmedMoneroTrx.length; i++) {
  //     let moneroTransfers = (
  //       await axios.post(
  //         'http://127.0.0.1:3001/wallet/getTxsForSubAddressIndex',
  //         {
  //           addressIndex: userAccount.notConfirmedMoneroTrx[i],
  //         },
  //       )
  //     ).data;

  //     if (moneroTransfers.length) {
  //       let { numConfirmations } = moneroTransfers[0];
  //       let { amount } = moneroTransfers[0].incomingTransfers[0];

  //       if (numConfirmations > 3) {
  //         userAccount.notConfirmedMoneroTrx.splice(i, 1);
  //         userAccount.balanceMonero =
  //           Number(userAccount.balanceMonero) + Number(amount);
  //         userAccount.save();
  //       }
  //     }

      // let { numConfirmations } = moneroTransfers[0] ? moneroTransfers[0] : 0;
      // let { amount } = moneroTransfers[0].incomingTransfers[0]
      //   ? moneroTransfers[0].incomingTransfers[0]
      //   : 0;

      // if (numConfirmations > 3) {
      //   console.log({
      //     numConfirmations,
      //     amount,
      //   });
      // }
      //   moneroTransfers.map((tx) => {
      //   let { numConfirmations } = tx;
      //   let { amount } = tx.incomingTransfers[0];
      //   if (numConfirmations > 3) {
      //     console.log(amount);
      //   }
      // });
    // }
    // return dto.uid;
  // }


}
