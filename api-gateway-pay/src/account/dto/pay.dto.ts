import { IsString, Validate } from "class-validator";


export class PayDto {

    // @Validate()
    @IsString()
    uid:string;

    @IsString()
    url:string;

    
}