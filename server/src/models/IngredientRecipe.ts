import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType} from "type-graphql";
import * as buffer from "buffer";

@ObjectType({description: 'The IngredientsRecipeModel model'})
@modelOptions({schemaOptions:{collection: 'IngredientsRecipeModel', timestamps: true}})
export class IngredientsRecipe{
    @Field()
    @Property({type: () => String, required: true})
    idIngredient:string;

    @Field()
    @Property({type: () => String, required: true})
    nameIngrdient: string;

    @Field()
    @Property({type: () => Number, required: true})
    quantity: number;
}

export const IngredientsRecipeModel = getModelForClass(IngredientsRecipe);


