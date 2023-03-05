import {Field, InputType, ID} from 'type-graphql';
import {Client} from "../../models/Client";



@InputType()
export class ClientType implements Partial<Client>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field()
    name: string;

    @Field()
    location: string;

    @Field()
    phone: string;

    @Field()
    whatsapp: string;
}