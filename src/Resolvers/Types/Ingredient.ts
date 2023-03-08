import {Field, InputType, ID} from 'type-graphql';
import {Ingredient} from "../../models/Ingredient";


@InputType()
export class IngredientType implements Partial<Ingredient>{
    @Field(() => ID, {nullable: true})
    id: string;

    @Field()
    name: string;

    @Field()
    presentation: number;

    @Field()
    costPerGram: number;

    @Field()
    performance: number;

    @Field()
    supplier: string;

    @Field()
    performancePercentage: number;

    @Field()
    mermado: number;

    @Field()
    productMultiplyByTwo: number;

}