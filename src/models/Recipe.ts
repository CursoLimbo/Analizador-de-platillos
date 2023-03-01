import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";
import {Ingredient} from "./Ingredient";

@ObjectType({description: 'The recipe model'})
@modelOptions({schemaOptions:{collection: 'Recipe', timestamps: true}})
export class Recipe{
    @Field( ()=> ID)
    id:string;

    @Field()
    @Property({type: () => String, required: true})
    name: string;


    @Field()
    @Property({type: () => [String] , required: true})
    ingredients: string[];

    @Field()
    @Property({type: () => String, required: true})
    procedure: string;

    @Field()
    @Property({type: () => Number, required: true})
    totalCostPerQuantity: number;

    @Field()
    @Property({type: () => Number, required: true})
    PercentageInflation: number;

    @Field()
    @Property({type: () => Number, required: true})
    salesTax: number;

    @Field()
    @Property({type: () => Number, required: true})
    serviceTax: number;

    @Field()
    @Property({type: () => Number, required: true})
    utilities: number;

    @Field()
    @Property({type: () => Number, required: true})
    revenue: number;


    @Field()
    @Property({type: () => Number, required: true})
    unitCost: number;

}

export const RecipeModel = getModelForClass(Recipe);


