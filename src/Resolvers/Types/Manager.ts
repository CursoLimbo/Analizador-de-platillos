import {Field, InputType, ID} from 'type-graphql';
import {Manager} from "../../models/Manager";

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

    @Field()
    bankAccounts: string[];

    @Field()
    whatsapp: string;

    @Field()
    photo: string;

}