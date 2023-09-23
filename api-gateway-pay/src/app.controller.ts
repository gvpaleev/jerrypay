import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
// import { GetBalanceDto } from './dto/get-balance.dto';
// import { getAddressForReplenishmentDto } from './dto/address-for-replenishment.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post('getBalance')
  // async getBalance(@Body() dto: GetBalanceDto) {
  //   return this.appService.getBalance(dto);
  // }

  // @Post('getAddressForReplenishment')
  // async getAddressForReplenishment(@Body() dto: getAddressForReplenishmentDto) {
  //   return this.appService.getAddressForReplenishment(dto);
  // }

  // @Post('pay')
  // async pay() {}
}
