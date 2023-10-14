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
    ingredientsId: string[];

    @Field(type => [Number])
    ingredientsQuantity: number[];

    @Field()
    procedure: string;

    @Field()
    portions: number;

    @Field({nullable: true})
    totalCostPerQuantity: number;

    @Field({nullable: true})
    PercentageInflation: number;

    @Field({nullable: true})
    salesTax: number;

    @Field({nullable: true})
    serviceTax: number;

    @Field({nullable: true})
    utilities: number;

    @Field({nullable: true})
    revenue: number;

    @Field({nullable: true})
    unitCost: number;
}