import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { IsString } from 'class-validator';

export interface CreateSubAccountForReplenishmentDto extends Base {}

export class CreateSubAccountForReplenishmentDto extends TimeStamps {
  @IsString()
  accountIndex: string;
}
