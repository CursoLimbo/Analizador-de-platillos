import {Field, InputType, ID} from 'type-graphql';
import {Manager} from "../../models/Manager";
import {type} from "os";


@InputType()
export class ManagerType implements Partial<Manager>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field({nullable : true})
    name: string;

    @Field({nullable : true})
    phone: string;

    @Field({nullable : true})
    email: string;

    @Field( {nullable : true})
    password: string;

    @Field( type => [String], {nullable : true})
    bankAccounts: string[];

    @Field({nullable : true})
    whatsapp: string;

    @Field({nullable : true})
    photo: string;

}


