import {Field, InputType, ID} from 'type-graphql';
import {BankAccount} from "../../models/BankAccount";


@InputType()
export class BankAccountType implements Partial<BankAccount>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field()
    bank: string;

    @Field()
    accountNumber: string;

    @Field()
    owner: string;
}