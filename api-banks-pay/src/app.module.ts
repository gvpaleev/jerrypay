import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TinkoffPayModule } from './tinkoff-pay/tinkoff-pay.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
    TinkoffPayModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
