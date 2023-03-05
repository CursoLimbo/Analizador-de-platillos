import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";


@ObjectType({description: 'The quotation model'})
@modelOptions({schemaOptions:{collection: 'Quotation', timestamps: true}})
export class Quotation{
    @Field( ()=> ID)
    id:string;

    @Field()
    @Property({type: () => String, required: true})
    typeOfQuotation: string;


    @Field()
    @Property({type: () => String, required: true})
    client: string;

    @Field()
    @Property({type: () => String, required: true})
    date: string;

    @Field()
    @Property({type: () => String, required: true})
    code: string;

    @Field()
    @Property({type: () => [String], required: true})
    recipes: string[];

    @Field()
    @Property({type: () => Number, required: true})
    total: number;

    @Field()
    @Property({type: () => String, required: true})
    bankAccounts: string[];

    @Field()
    @Property({type: () => String, required: true})
    develop: string;

    @Field()
    @Property({type: () => Number, required: true})
    discount: number;


    @Field()
    @Property({type: () => String, required: true})
    company: string;

    @Field()
    @Property({type: () => Number, required: true})
    amountOfPeople: number;

}

export const QuotationModel = getModelForClass(Quotation);


