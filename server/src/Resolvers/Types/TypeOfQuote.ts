import {Field, InputType, ID} from 'type-graphql';
import {TypeOfQuote} from "../../models/TypeOfQuote";


@InputType()
export class TypeOfQuoteType implements Partial<TypeOfQuote>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field()
    name: string;

    @Field(type => [String])
    additionalSpots: string[];

    @Field()
    developmentTemplate: string;

    @Field()
    TermsConditions: string;
}