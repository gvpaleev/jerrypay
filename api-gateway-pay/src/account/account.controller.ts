import { Body, Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';
import { GetBalanceDto } from './dto/get-balance.dto';
import { PayDto } from './dto/pay.dto';

@Controller('account')
export class AccountController {
    constructor(
        private readonly accountService:AccountService,
    ){}

    
    @Get('getBalance')
    async getBalance(@Body() dto:GetBalanceDto){
        return this.accountService.getBalance(dto);
    }

    @Get('pay')
    async pay(@Body() dto : PayDto){
        return this.accountService.pay(dto)
    }
}
