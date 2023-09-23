import { Prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

// class AddressForReplenishment {
//   @IsString()
//   @Prop()
//   address: string;

//   @IsNumber()
//   @Prop()
//   index: Number;
// }

export interface AccountModel extends Base {}
export class AccountModel extends TimeStamps {
  @IsString()
  @Prop({ unique: true })
  uid: string;

  @IsNumber()
  @Prop()
  balanceRub: number;

  @IsNumber()
  @Prop()
  balanceMonero: number;

  @IsArray()
  @Prop({ type: () => [Number] })
  notConfirmedMoneroTrx: number[];

  // @Type(() => AddressForReplenishment)
  // @Prop({ type: () => AddressForReplenishment, _id: false })
  // addressForReplenishment: AddressForReplenishment;

  // @IsOptional()
  // @Prop()
  // balanceRub?: string;
}
