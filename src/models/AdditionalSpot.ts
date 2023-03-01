import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";

@ObjectType({description: 'The additional spot model'})
@modelOptions({schemaOptions:{collection: 'AdditionalSpot', timestamps: true}})
export class AdditionalSpot{
    @Field( ()=> ID)
    id:string;

    @Field()
    @Property({type: () => String, required: true})
    name: string;


    @Field()
    @Property({ type: () => String, required: true})
    value: string;

}

export const AdditionalSpotModel = getModelForClass(AdditionalSpot);


