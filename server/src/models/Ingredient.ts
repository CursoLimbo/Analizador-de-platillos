import {prop as Property, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {Field, ObjectType, ID} from "type-graphql";

@ObjectType({description: 'The ingredient model'})
@modelOptions({schemaOptions:{collection: 'Ingredient', timestamps: true}})
export class Ingredient{
    @Field( ()=> ID)
    id:string;

    @Field()
    @Property({type: () => String, required: true})
    name: string;


    @Field()
    @Property({type: () => Number, required: true})
    presentation: number;

    @Field()
    @Property({type: () => Number, required: true})
    costPerGram: number;

    @Field()
    @Property({type: () => Number, required: true})
    performance: number;

    @Field()
    @Property({type: () => String, required: true})
    supplier: string;

    @Field()
    @Property({type: () => Number, required: true})
    performancePercentage: number;


    @Field()
    @Property({type: () => Number, required: true})
    mermado: number;

    @Field()
    @Property({type: () => Number, required: true})
    productMultiplyByTwo: number;

}

export const IngredientModel = getModelForClass(Ingredient);


