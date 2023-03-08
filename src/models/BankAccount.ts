import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";

@ObjectType({description: 'The bank account model'})
@modelOptions({schemaOptions:{collection: 'BankAccount', timestamps: true}})
export class BankAccount{
    @Field( ()=> ID)
    id:string;

    @Field()
    @Property({type: () => String, required: true})
    bank: string;


    @Field()
    @Property({ type: ()=> String, required: true})
    accountNumber: string;


}

export const BankAccountModel = getModelForClass(BankAccount);


