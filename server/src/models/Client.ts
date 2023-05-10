import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";

@ObjectType({description: 'The clientApp model'})
@modelOptions({schemaOptions:{collection: 'Client', timestamps: true}})
export class Client{
    @Field( ()=> ID)
    id:string;

    @Field()
    @Property({type: () => String, required: true})
    name: string;


    @Field()
    @Property({type: () => String , required: true})
    location: string;

    @Field()
    @Property({type: () => String, required: true})
    phone: string;

    @Field()
    @Property({type: () => String, required: true})
    whatsapp: string;

    @Field()
    @Property({type: () => String, required: true})
    email: string;

}

export const ClientModel = getModelForClass(Client);


