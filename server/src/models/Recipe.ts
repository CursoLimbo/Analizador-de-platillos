import { prop as Property, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Field, ObjectType, ID } from "type-graphql";
import { IngredientRecipeType } from "../Resolvers/Types/Recipe";
import { IngredientRecipeModel, IngredientRecipe } from "./IngredientRecipe";

@ObjectType({ description: 'The recipe model' })
@modelOptions({ schemaOptions: { collection: 'Recipe', timestamps: true } })
export class Recipe {
    @Field(() => ID)
    id: string;

    @Field()
    @Property({ type: () => String, required: true })
    sid: string; // Add sid field

    @Field()
    @Property({ type: () => String, required: true })
    name: string;

    @Field(type => [IngredientRecipe])
    @Property({ type: () => [IngredientRecipe], required: true })
    ingredients: IngredientRecipe[];

    @Field()
    @Property({ type: () => String, required: true })
    procedure: string;

    @Field()
    @Property({ type: () => Number, required: true })
    portions: number;

    @Field({ nullable: true })
    @Property({ type: () => Number, required: false })
    totalCostPerQuantity: number;

    @Field({ nullable: true })
    @Property({ type: () => Number, required: false })
    totalCostRawMaterial: number;

    @Field({ nullable: true })
    @Property({ type: () => Number, required: false })
    PercentageInflation: number;

    @Field({ nullable: true })
    @Property({ type: () => Number, required: false })
    salesTax: number;

    @Field({ nullable: true })
    @Property({ type: () => Number, required: false })
    serviceTax: number;

    @Field({ nullable: true })
    @Property({ type: () => Number, required: false })
    utilities: number;

    @Field({ nullable: true })
    @Property({ type: () => Number, required: false })
    revenue: number;

    @Field({ nullable: true })
    @Property({ type: () => Number, required: false })
    unitCost: number;

    @Field({ nullable: true })
    @Property({ type: () => String, required: false })
    version: string;
}

export const RecipeModel = getModelForClass(Recipe);
