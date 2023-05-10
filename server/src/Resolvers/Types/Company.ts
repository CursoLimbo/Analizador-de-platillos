import {Field, InputType, ID} from 'type-graphql';
import {Company} from "../../models/Company";



@InputType()
export class CompanyType implements Partial<Company>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field({nullable : true})
    name: string;

    @Field({nullable : true})
    email: string;

    @Field({nullable : true})
    phone: string;

    @Field({nullable : true})
    logo: string;

}