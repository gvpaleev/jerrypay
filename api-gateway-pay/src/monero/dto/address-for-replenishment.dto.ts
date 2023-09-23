import { IsOptional, IsString } from 'class-validator';

export class getAddressForReplenishmentDto {
  @IsString()
  uid: string;

  // @IsString()
  // moneroAccountIndex: string;
}
