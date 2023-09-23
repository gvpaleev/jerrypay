
import { Prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";


export interface WalletModel extends Base{};


export class WalletModel extends TimeStamps{
        @Prop()
        idUSer:string;
}