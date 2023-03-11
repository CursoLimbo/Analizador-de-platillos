import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";

@ObjectType({description: 'The manager model'})
@modelOptions({schemaOptions:{collection: 'Manager', timestamps: true}})
export class Manager{
    @Field( ()=> ID)
    id:string;

    @Field( ()=> String)
    token:string;

    @Field()
    @Property({type: () => String, required: true})
    name: string;

    @Field()
    @Property({type: () => String, required: true})
    phone: string;

    @Field()
    @Property({type: () => String, required: true})
    email: string;

    @Field()
    @Property({type: () => String, required: true})
    password: string;

    @Field(type => [String])
    @Property({type: () => [String], required: true})
    bankAccounts: string[];

    @Field()
    @Property({type: () => String, required: true})
    whatsapp: string;

    @Field()
    @Property({type: () => String, required: true})
    photo: string;
}

export const ManagerModel = getModelForClass(Manager);


