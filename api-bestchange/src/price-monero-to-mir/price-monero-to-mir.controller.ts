import { Controller, Get } from '@nestjs/common';
import { PriceMoneroToMirService } from './price-monero-to-mir.service';

@Controller('')
export class PriceMoneroToMirController {
    constructor(private readonly priceMoneroToMirService : PriceMoneroToMirService){}

    @Get('getPriceMoneroToMir')
    async getMoneroToMir(){
        return this.priceMoneroToMirService.getPrice();
    }


}

