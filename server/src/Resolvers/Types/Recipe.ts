import {Field, InputType, ID} from 'type-graphql';
import {Recipe} from "../../models/Recipe";
import {type} from "os";


@InputType()
export class RecipeType implements Partial<Recipe>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field()
    name: string;

    @Field(type => [String])
    ingredients: string[];

    @Field()
    procedure: string;

    @Field()
    totalCostPerQuantity: number;

    @Field()
    PercentageInflation: number;

    @Field()
    salesTax: number;

    @Field()
    serviceTax: number;

    @Field()
    utilities: number;

    @Field()
    revenue: number;

    @Field()
    unitCost: number;
}