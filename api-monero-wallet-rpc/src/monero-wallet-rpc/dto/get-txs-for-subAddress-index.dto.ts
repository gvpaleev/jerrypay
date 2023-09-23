import { IsNumber } from 'class-validator';

export class GetTxsForSubAddressIndexDto {
  // @IsNumber()
  addressIndex: number;
}
