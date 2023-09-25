import { Body, Controller, Get, Post } from '@nestjs/common';
import { TinkoffPayService } from './tinkoff-pay.service';
import { TinkoffPayDto } from './dto/tinkoff-pay.dto';
import { GetAmountPay } from './dto/get-amount-pay.dto';

@Controller('tinkoff')
export class TinkoffPayController {
    constructor(private readonly tinkoffPayService: TinkoffPayService){}
    
    @Post('pay')
    async tinkoffPay(@Body() dto : TinkoffPayDto){
        console.log(dto)
        return await this.tinkoffPayService.pay(dto); 
    }
    @Post('getAmountPay')
    async getAmountPay(@Body() dto: GetAmountPay){
        return await this.tinkoffPayService.getAmountPay(dto);
    }

}
