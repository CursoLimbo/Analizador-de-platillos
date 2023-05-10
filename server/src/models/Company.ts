import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";

@ObjectType({description: 'The company model'})
@modelOptions({schemaOptions:{collection: 'Company', timestamps: true}})
export class Company{
    @Field( ()=> ID)
    id:string;

    @Field()
    @Property({type: () => String, required: true})
    name: string;

    @Field()
    @Property({type: () => String , required: true})
    email: string;

    @Field()
    @Property({type: () => String, required: true})
    phone: string;

    @Field()
    @Property({type: () => String, required: true})
    logo: string;
}

export const CompanyModel = getModelForClass(Company);


