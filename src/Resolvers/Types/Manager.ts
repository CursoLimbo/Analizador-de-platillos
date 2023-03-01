import {Field, InputType, ID} from 'type-graphql';
import {Manager} from "../../models/Manager";
import {type} from "os";


@InputType()
export class ManagerType implements Partial<Manager>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field()
    name: string;

    @Field()
    phone: string;

    @Field()
    email: string;

    @Field(type => [String])
    bankAccounts: string[];

    @Field()
    whatsapp: string;

    @Field()
    photo: string;

}