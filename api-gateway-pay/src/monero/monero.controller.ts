import { Body, Controller, Get, Post } from '@nestjs/common';
import { MoneroService } from './monero.service';
import { getAddressForReplenishmentDto } from './dto/address-for-replenishment.dto';

@Controller('monero')
export class MoneroController {
    constructor(
        private readonly moneroService:MoneroService
    ){}

    @Post ('getAddressForReplenishment')
    async getAddressForReplenishment(@Body() dto :getAddressForReplenishmentDto){
        return this.moneroService.getAddressForReplenishment(dto)
    }
}
