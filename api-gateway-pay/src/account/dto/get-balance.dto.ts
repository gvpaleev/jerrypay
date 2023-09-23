import { IsString, Validate } from "class-validator";


export class GetBalanceDto {

    // @Validate()
    @IsString()
    uid:string;

    
}