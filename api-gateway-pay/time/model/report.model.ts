
import { Prop } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";

export interface Report extends Base{};

export class Report extends TimeStamps{

	// @Prop({unique:true})
	// uid:string;

	// @Prop()
	// balanceMonero: string;

	// @Prop()
	// balanceRub: string;

	// @Prop()
	// addressMonero: string;

}