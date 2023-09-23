import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceMoneroToMirModule } from './price-monero-to-mir/price-monero-to-mir.module';

@Module({
  imports: [PriceMoneroToMirModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
