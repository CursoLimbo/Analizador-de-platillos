import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";

@ObjectType({description: 'The type of quote model'})
@modelOptions({schemaOptions:{collection: 'Catalogue', timestamps: true}})
export class TypeOfQuote{
    @Field( ()=> ID)
    id:string;

    @Field()
    @Property({type: () => String, required: true})
    name: string;


    @Field()
    @Property({ type: ()=> [String], required: false})
    additionalSpots: string[];

    @Field()
    @Property({type: () => String, required: true})
    developmentTemplate: string;

    @Field()
    @Property({type: () => String, required: true})
    TermsConditions: string;
}

export const TypeOfQuoteModel = getModelForClass(TypeOfQuote);


