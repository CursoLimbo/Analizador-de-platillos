import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";

@ObjectType({description: 'The discount model'})
@modelOptions({schemaOptions:{collection: 'Discount', timestamps: true}})
export class Discount{
    @Field( ()=> ID)
    id:string;

    @Field()
    @Property({type: () => String, required: true})
    name: string;

    @Field()
    @Property({type: () => Number, required: true})
    percentage: number;

    @Field()
    @Property({type: () => String, required: true})
    description: string;

}

export const DiscountModel = getModelForClass(Discount);


