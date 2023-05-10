import {Field, InputType, ID} from 'type-graphql';
import {Quotation} from "../../models/Quotation";
import {type} from "os";

@InputType()
export class QuotationType implements Partial<Quotation>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field()
    typeOfQuotation: string;

    @Field()
    client: string;

    @Field()
    date: string;

    @Field()
    code: string;

    @Field(type => [String])
    recipes: string[];

    @Field()
    total: number;

    @Field(type => [String])
    bankAccounts: string[];

    @Field()
    develop: string;

    @Field({nullable: true})
    discount: number;

    @Field()
    company: string;

    @Field()
    amountOfPeople: number;
}