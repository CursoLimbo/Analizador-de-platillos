import {Field, InputType, ID} from 'type-graphql';
import {Company} from "../../models/Company";



@InputType()
export class CompanyType implements Partial<Company>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    phone: string;

    @Field()
    logo: string;

}