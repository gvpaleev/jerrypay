import { Module } from '@nestjs/common';
import { PriceMoneroToMirController } from './price-monero-to-mir.controller';
import { PriceMoneroToMirService } from './price-monero-to-mir.service';

@Module({
  controllers: [PriceMoneroToMirController],
  providers: [PriceMoneroToMirService]
})
export class PriceMoneroToMirModule {}
