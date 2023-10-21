import { Field, InputType, ID } from 'type-graphql';
import { Recipe } from '../../models/Recipe';


@InputType()
export class IngredientRecipeType {
    @Field()
    idIngredient: string;

    @Field()
    nameIngredient: string;

    @Field()
    quantity: number;
}

@InputType()
export class RecipeType implements Partial<Recipe> {
    @Field(() => ID, { nullable: true })
    id: string;

    @Field()
    name: string;

    @Field(() => [IngredientRecipeType]) 
    ingredients: IngredientRecipeType[];

    @Field()
    procedure: string;

    @Field()
    portions: number;

    @Field({ defaultValue: 0 })
    totalCostPerQuantity: number;

    @Field({ defaultValue: 0 })
    PercentageInflation: number;

    @Field({ defaultValue: 0 })
    salesTax: number;

    @Field({ defaultValue: 0 })
    serviceTax: number;

    @Field({ defaultValue: 0 })
    utilities: number;

    @Field({ defaultValue: 0 })
    revenue: number;

    @Field({ defaultValue: 0 })
    unitCost: number;
}
