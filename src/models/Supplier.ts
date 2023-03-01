import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";

@ObjectType({description: 'The supplier model'})
@modelOptions({schemaOptions:{collection: 'Supplier', timestamps: true}})
export class Supplier{
    @Field( ()=> ID)
    id:string;

    @Field()
    @Property({type: () => String, required: true})
    name: string;

    @Field()
    @Property({type: () => Number, required: true})
    location: number;

    @Field()
    @Property({type: () => Number, required: true})
    phone: number;

}

export const SupplierModel = getModelForClass(Supplier);

