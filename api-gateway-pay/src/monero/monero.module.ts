import { Module, forwardRef } from '@nestjs/common';
import { MoneroController } from './monero.controller';
import { MoneroService } from './monero.service';
import { AccountModule } from 'src/account/account.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    forwardRef(()=>AccountModule),
    ConfigModule
  ],
  controllers: [MoneroController],
  providers: [MoneroService],
  exports:[MoneroService]
})
export class MoneroModule {}
