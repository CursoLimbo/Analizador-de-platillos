import {Field, InputType, ID} from 'type-graphql';
import {Discount} from "../../models/Discount";

@InputType()
export class DiscountType implements Partial<Discount>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field()
    name: string;

    @Field()
    percentage: number;

    @Field()
    description: string;

}