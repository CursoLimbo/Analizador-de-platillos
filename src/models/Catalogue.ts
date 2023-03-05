import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";

@ObjectType({description: 'The catalogue model'})
@modelOptions({schemaOptions:{collection: 'Catalogue', timestamps: true}})
export class Catalogue{
    @Field( ()=> ID)
    id:string;

    @Field()
    @Property({type: () => String, required: true})
    name: string;


    @Field()
    @Property({ required: true, default: Date.now()})
    date: Date;

    @Field()
    @Property({type: () => String, required: true})
    file: string;

}

export const CatalogueModel = getModelForClass(Catalogue);


