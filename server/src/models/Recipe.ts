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

    @Field(type => [String])
    @Property({type: () => [String] , required: true})
    ingredientsId: string[];

    @Field(type => [Number])
    @Property({type: () => [Number] , required: true})
    ingredientsQuantity: number[];

    @Field()
    @Property({type: () => String, required: true})
    procedure: string;

    @Field()
    @Property({type: () => Number, required: true})
    portions: number;

    @Field()
    @Property({type: () => Number, required: false})
    totalCostPerQuantity: number;

    @Field()
    @Property({type: () => Number, required: false})
    PercentageInflation: number;

    @Field()
    @Property({type: () => Number, required: false})
    salesTax: number;

    @Field()
    @Property({type: () => Number, required: false})
    serviceTax: number;

    @Field()
    @Property({type: () => Number, required: false})
    utilities: number;

    @Field()
    @Property({type: () => Number, required: false})
    revenue: number;


    @Field()
    @Property({type: () => Number, required: false})
    unitCost: number;

}

export const RecipeModel = getModelForClass(Recipe);


