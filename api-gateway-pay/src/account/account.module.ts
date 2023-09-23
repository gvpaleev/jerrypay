import { Module, forwardRef } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { AccountModel } from './model/account.model';
import { MoneroModule } from 'src/monero/monero.module';

@Module({
    imports:[
        forwardRef(() => MoneroModule),
        TypegooseModule.forFeature([
        {
        typegooseClass: AccountModel,
        schemaOptions: {
          collection: 'account',
        },
      },
    ]),
      
  ],
    controllers: [AccountController],
    providers: [AccountService],
    exports:[AccountService]
})
export class AccountModule {}
