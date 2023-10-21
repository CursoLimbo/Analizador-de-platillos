import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";
import * as buffer from "buffer";

@ObjectType({description: 'The IngredientRecipe model'})
@modelOptions({schemaOptions:{collection: 'IngredientRecipe', timestamps: true}})
export class IngredientRecipe{
    @Field()
    @Property({type: () => String, required: true})
    idIngredient: string;

    @Field()
    @Property({type: () => String, required: true})
    nameIngredient: string;

    @Field()
    @Property({type: () => Number, required: true})
    quantity: number;

  

}

export const IngredientRecipeModel = getModelForClass(IngredientRecipe);


